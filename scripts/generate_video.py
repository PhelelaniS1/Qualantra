import subprocess
import os

app_dir = "/app/applet"
images = [
    os.path.join(app_dir, "src/assets/images/shot1_teacher_perspective_1790274417524.jpg"),
    os.path.join(app_dir, "src/assets/images/shot2_learner_perspective_1790274430057.jpg"),
    os.path.join(app_dir, "src/assets/images/shot3_classroom_overview_1790274441641.jpg"),
    os.path.join(app_dir, "src/assets/images/shot4_admin_perspective_1790274454325.jpg"),
    os.path.join(app_dir, "src/assets/images/shot5_connected_ecosystem_1790274464411.jpg"),
]

for img in images:
    if not os.path.exists(img):
        print(f"Missing image: {img}")
        exit(1)

public_dir = os.path.join(app_dir, "public")
os.makedirs(public_dir, exist_ok=True)
out_mp4 = os.path.join(public_dir, "qualantra-hero-brand-film.mp4")
out_webm = os.path.join(public_dir, "qualantra-hero-brand-film.webm")

# 5 shots, exactly 8.0s seamless loop:
# Shot 1: Teacher (0.0 to 2.0s)
# Shot 2: Learner (2.0 to 4.0s)
# Shot 3: Classroom (4.0 to 5.6s)
# Shot 4: Admin (5.6 to 7.0s)
# Shot 5: Ecosystem (7.0 to 8.0s)
filter_complex = """
[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0006,1.06)':d=72:s=1920x1080:fps=30,setpts=PTS-STARTPTS[v0];
[1:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='1.03':x='min(x+1,iw-iw/1.03)':d=72:s=1920x1080:fps=30,setpts=PTS-STARTPTS[v1];
[2:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='max(1.06-0.0007*on,1.0)':d=60:s=1920x1080:fps=30,setpts=PTS-STARTPTS[v2];
[3:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0005,1.05)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=54:s=1920x1080:fps=30,setpts=PTS-STARTPTS[v3];
[4:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='1.02':d=42:s=1920x1080:fps=30,setpts=PTS-STARTPTS[v4];
[v0][v1]xfade=transition=fade:duration=0.4:offset=2.0[xf0];
[xf0][v2]xfade=transition=fade:duration=0.4:offset=4.0[xf1];
[xf1][v3]xfade=transition=fade:duration=0.4:offset=5.6[xf2];
[xf2][v4]xfade=transition=fade:duration=0.4:offset=7.0[outv]
"""

cmd_mp4 = [
    "ffmpeg", "-y",
    "-loop", "1", "-t", "2.4", "-i", images[0],
    "-loop", "1", "-t", "2.4", "-i", images[1],
    "-loop", "1", "-t", "2.0", "-i", images[2],
    "-loop", "1", "-t", "1.8", "-i", images[3],
    "-loop", "1", "-t", "1.4", "-i", images[4],
    "-filter_complex", filter_complex.strip(),
    "-map", "[outv]",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-preset", "veryfast",
    "-crf", "22",
    "-r", "30",
    "-movflags", "+faststart",
    out_mp4
]

print("Rendering MP4...")
subprocess.run(cmd_mp4, check=True)
print(f"MP4 success: {out_mp4} ({os.path.getsize(out_mp4)} bytes)")

cmd_webm = [
    "ffmpeg", "-y",
    "-i", out_mp4,
    "-c:v", "libvpx-vp9",
    "-b:v", "1.5M",
    "-crf", "30",
    out_webm
]
print("Rendering WebM...")
subprocess.run(cmd_webm, check=True)
print(f"WebM success: {out_webm} ({os.path.getsize(out_webm)} bytes)")
