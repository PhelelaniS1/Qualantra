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

out_mp4 = os.path.join(app_dir, "public/qualantra-hero-brand-film.mp4")
out_webm = os.path.join(app_dir, "public/qualantra-hero-brand-film.webm")

# Generate 8.0 seconds total at 30 fps (240 frames total)
# Shot 1: 0 - 2.0s (frames 0 to 60)
# Shot 2: 2.0s - 4.0s (frames 60 to 120)
# Shot 3: 4.0s - 5.6s (frames 120 to 168)
# Shot 4: 5.6s - 7.0s (frames 168 to 210)
# Shot 5: 7.0s - 8.0s (frames 210 to 240)

# With smooth 0.3s (9 frames) crossfades:
filter_complex = """
[0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0008,1.05)':d=69:s=1920x1080:fps=30,trim=duration=2.3,setpts=PTS-STARTPTS[v0];
[1:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='1.03':x='min(x+0.8,iw-iw/1.03)':d=69:s=1920x1080:fps=30,trim=duration=2.3,setpts=PTS-STARTPTS[v1];
[2:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='max(1.05-0.0008*on,1.0)':d=57:s=1920x1080:fps=30,trim=duration=1.9,setpts=PTS-STARTPTS[v2];
[3:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0006,1.04)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=51:s=1920x1080:fps=30,trim=duration=1.7,setpts=PTS-STARTPTS[v3];
[4:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='1.02':d=39:s=1920x1080:fps=30,trim=duration=1.3,setpts=PTS-STARTPTS[v4];
[v0][v1]xfade=transition=fade:duration=0.3:offset=2.0[xf0];
[xf0][v2]xfade=transition=fade:duration=0.3:offset=4.0[xf1];
[xf1][v3]xfade=transition=fade:duration=0.3:offset=5.6[xf2];
[xf2][v4]xfade=transition=fade:duration=0.3:offset=7.0,trim=duration=8.0[outv]
"""

cmd = [
    "ffmpeg", "-y",
    "-loop", "1", "-t", "2.5", "-i", images[0],
    "-loop", "1", "-t", "2.5", "-i", images[1],
    "-loop", "1", "-t", "2.2", "-i", images[2],
    "-loop", "1", "-t", "2.0", "-i", images[3],
    "-loop", "1", "-t", "1.5", "-i", images[4],
    "-filter_complex", filter_complex.strip(),
    "-map", "[outv]",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-preset", "fast",
    "-crf", "22",
    "-r", "30",
    "-t", "8.0",
    "-movflags", "+faststart",
    out_mp4
]

print("Encoding 8s MP4...")
subprocess.run(cmd, check=True)
print("MP4 completed!")

# Also generate fast WebM
cmd_webm = [
    "ffmpeg", "-y",
    "-i", out_mp4,
    "-c:v", "libvpx-vp9",
    "-crf", "32",
    "-b:v", "0",
    "-deadline", "realtime",
    "-cpu-used", "4",
    out_webm
]
print("Encoding 8s WebM...")
subprocess.run(cmd_webm, check=True)
print("WebM completed!")
