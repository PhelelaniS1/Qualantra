<div align="center">
  <img src="src/assets/New%20images/Qualantra-README-Banner.png" alt="QUALANTRA — Learn. Teach. Connect." width="100%" />
</div>

# QUALANTRA

> **Learn. Teach. Connect.**
>
> A digital school built to connect learners, qualified teachers, and responsible AI in one accessible learning environment.

Quality education should connect with teaching opportunity.

## A school should not be limited by where a learner is born

A learner's future should not be determined by the school they can afford, the resources available in their community, or whether they have access to a qualified teacher.

Yet for many learners in South Africa, particularly in township and rural communities, access to consistent, quality educational support remains a challenge.

At the same time, qualified educators are looking for opportunities to teach, contribute, and build meaningful careers.

**QUALANTRA was born from the belief that these two challenges should not be treated separately.**

What if technology could connect a learner who needs support with a qualified teacher who needs an opportunity?

What if responsible AI could help make lessons more accessible, learning more personal, and teaching more effective?

That is the idea behind QUALANTRA.

We are building a digital school where learning, teaching, accessibility, and opportunity belong in the same place.

## More than a learning platform

QUALANTRA is designed around three connected purposes:

### Learn

Learners should have access to structured, curriculum-aligned learning, practice, assessments, and additional support without being excluded by geography or the cost of traditional educational resources.

The long-term vision spans Grade 1 through university, with an initial focus on a practical, CAPS-aligned learning experience.

### Teach

Qualified educators are not an afterthought or a feature to be replaced by software. They are central to the school.

QUALANTRA is being designed to support full-time, part-time, substitute, and specialist teaching opportunities.

By connecting educators with learners who need instruction, the platform aims to create a sustainable relationship between educational access and employment opportunity.

### Connect

Learning works best when learners, teachers, and parents can participate meaningfully.

QUALANTRA is designed to bring these relationships into one accessible environment, with the teacher remaining responsible for instruction and the learner's educational journey.

---

## Introducing SignFusion™

**SignFusion is QUALANTRA's flagship accessibility vision: a classroom where disability does not have to mean exclusion.**

A learner who is deaf should be able to participate in a lesson alongside hearing classmates.

A qualified deaf teacher should be able to teach a classroom where learners can understand and engage with the lesson.

The intended experience works in both directions.

### When a learner is deaf

A teacher delivers a lesson in spoken English.

SignFusion is intended to interpret the lesson and present it in sign language for the learner, helping them follow the same classroom instruction.

### When a teacher is deaf

A teacher delivers instruction using sign language.

SignFusion is intended to interpret those signs and make the lesson accessible to hearing learners through understandable language and audio.

The goal is not to separate learners into different classrooms.

**It is to help bring them together.**

SignFusion is a planned capability, not a claim of completed real-time sign-language translation. Its development will require careful work on language coverage, accuracy, accessibility testing, and the involvement of deaf educators and communities.

We believe accessibility should be part of the school's foundation, not something added after the fact.

---

## Meet Ali, the learning assistant

Ali is QUALANTRA's responsible AI learning assistant.

Ali is intended to help learners understand concepts, practice, and explore questions. It can support learning with curriculum-grounded information and educational explanations.

**But Ali is not the teacher.**

Qualified educators remain central to instruction, judgment, and the learning experience.

AI should extend the reach of good teaching, not remove the human relationship that makes education meaningful.

The current Ali backend uses Amazon Bedrock, curriculum knowledge retrieval, and configured safety guardrails.

---

## Education that can be more affordable

Quality educational support should not be reserved for families who can afford the most expensive options.

QUALANTRA is being designed around a monthly subscription model.

A free access tier is intended to provide a starting point, while paid access would unlock a broader range of learning resources and platform capabilities.

The purpose of the subscription is to support the sustainability of the school while improving the quality and reach of the learning experience.

The payment system and final subscription tiers are still part of the product roadmap.

---

## Built to connect education with opportunity

QUALANTRA is also being built with another problem in mind: qualified educators who need opportunities to teach.

The platform's long-term model is intended to create opportunities for educators to participate as:

- Full-time educators
- Part-time educators
- Substitute educators
- Specialist educators

Rather than treating education and employment as two separate problems, QUALANTRA aims to connect them.

A learner needs a teacher.

A teacher needs an opportunity.

**QUALANTRA is being built to help create that connection.**

---

## Built for South Africa, with a wider purpose

QUALANTRA starts with a South African reality: educational opportunity is unevenly distributed, and access to qualified teaching remains a meaningful challenge.

We want a learner in Soweto, a rural community, or a well-resourced suburb to be able to participate in a learning environment built around the same respect for their potential.

The platform is being designed with phone access in mind, while supporting the broader devices learners and educators may use.

Our long-term ambition reaches beyond South Africa.

Accessible education, teacher opportunity, and responsible use of technology are challenges shared across many communities.

---

## The technology behind QUALANTRA

QUALANTRA is being developed as an AWS-backed cloud application, with a frontend, authentication, APIs, data services, AI learning support, and live-classroom infrastructure.

### Current architecture

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React, TypeScript, Vite | Learner, educator, and classroom experience |
| Hosting and delivery | AWS Amplify, Amazon S3, Amazon CloudFront | Website hosting and content delivery |
| Authentication | Amazon Cognito | User identity and authenticated access |
| API | Amazon API Gateway | Application endpoints |
| Compute | AWS Lambda | Backend application logic |
| Database | Amazon DynamoDB | User, course, lesson, and SignFusion data foundations |
| AI | Amazon Bedrock | Ali's model access |
| Knowledge retrieval | Amazon Bedrock Knowledge Bases and Amazon S3 | Curriculum-grounded learning context |
| AI safety | Amazon Bedrock Guardrails | Configured safeguards for Ali |
| Live classroom | Amazon IVS Real-Time | Real-time classroom infrastructure |

### High-level request flow

```text
Learner / Teacher
       |
       v
QUALANTRA Web Application
       |
       +---- Amazon Cognito
       |
       v
Amazon API Gateway
       |
       v
AWS Lambda
       |
       +---- Amazon DynamoDB
       |
       +---- Amazon Bedrock Guardrails
       |
       +---- Amazon Bedrock
                  |
                  +---- Curriculum Knowledge Base
                             |
                             +---- Amazon S3
       |
       +---- Amazon IVS Real-Time
The architecture is evolving as the MVP develops.

The presence of a cloud resource does not imply that every end-to-end product workflow is complete.

---

## What is working today

The current MVP includes:

- A deployed QUALANTRA website with a custom domain.
- A React and TypeScript application.
- AWS-hosted frontend delivery.
- Cognito-backed authentication infrastructure.
- API Gateway and Lambda backend endpoints.
- DynamoDB foundations for users, courses, lessons, and SignFusion records.
- Ali's backend integration with Amazon Bedrock.
- Curriculum knowledge retrieval infrastructure.
- Configured Bedrock Guardrails for responsible AI behavior.
- Initial Grade 7 Mathematics and Natural Sciences curriculum work.
- Amazon IVS Real-Time classroom infrastructure and frontend integration.

---

## What we are building toward

The wider product roadmap includes:

- A complete learning journey across more grades and subjects.
- Full learner, teacher, parent, and administrator workflows.
- Expanded educator onboarding and qualification verification.
- A functioning SignFusion accessibility experience, developed with the communities it is intended to serve.
- More classroom and assessment capabilities.
- Subscription payments and access tiers.
- Expanded parent visibility and learner progress reporting.
- Continued testing for accessibility, safety, reliability, and affordability.

---

## Our commitment

QUALANTRA is not being built on the idea that technology alone can solve education.

It is being built on the belief that technology, when designed responsibly, can help good educators reach more learners, help learners access meaningful support, and make educational participation more inclusive.

We want a qualified teacher to see a real opportunity to teach.

We want a learner to feel that quality education is within reach.

We want a deaf learner and a deaf teacher to be considered in the design of the classroom from the beginning.

And we want families to have access to an educational experience that respects both their ambitions and their circumstances.

**Learn. Teach. Connect.**

That is the school we are working to build.

---

## Project

- **Product:** QUALANTRA
- **Tagline:** Learn. Teach. Connect.
- **Focus:** Digital education, educator opportunity, responsible AI, and accessibility
- **Initial curriculum focus:** CAPS-aligned Grade 7 Mathematics and Natural Sciences
- **Cloud platform:** Amazon Web Services
- **Repository:** https://github.com/PhelelaniS1/Qualantra
- **Website:** https://qualantra.com
- **WWW:** https://www.qualantra.com

*QUALANTRA is an independent project. References to CAPS describe curriculum alignment goals and do not imply formal endorsement or affiliation with the Department of Basic Education, SACE, IEB, or any government body.*
