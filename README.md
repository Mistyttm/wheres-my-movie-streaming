# CAB432 Mashup Project

***IN ORDER TO BUILD DOCKER IMAGE, THESE COMMANDS MUST FIRST BE RUN INSIDE `/src/app`***

`bun install`

`bun run build`

## Contents

 - [CAB432 Mashup Project](#cab432-mashup-project)
	 - [What you need to do](#what-you-need-to-do)
		 - [An overview](#an-overview)
		 - [Your Mashup](#your-mashup)
		 - [The Page Counter](#the-page-counter)
			 - [Object Approach](#object-approach)
			 - [Entity Approach](#entity-approach)
		 - [The Target Environment: Docker and the VM](#the-target-environment-docker-and-the-vm)
		 - [The Application](#the-application)
		 - [Understand Performance Metrics](#understand-performance-metrics)
	 - [What To Submit](#what-to-submit)
		 - [week 5: Mandatory Proposal](#week-5-mandatory-proposal)
		 - [Week 7: Report Draft](#week-7-report-draft)
		 - [Friday, Week 8: final Submission](#friday-week-8-final-submission)
		 - [Submission](#submission)
		 - [Feedback](#feedback)
		 - [Moderation](#moderation)
 - [Appendix](#appendix)
	 - [List of APIs for Inspiration](#list-of-apis-for-inspiration)
	 - [An overview](#lists-of-lists-of-apis-for-inspration)
 - [React + Typescript + Vite](#react--typescript--vite)
	 - [Expanding the ESLint Configuration](#expanding-the-eslint-configuration)

## **What you need to do**

This assignment asks you to deploy a stateless application using Docker and EC2.

### An overview

- **_Create a simple web application_**
    
    - A mashup of services and data (see later)
        
    - Most of the work must be done on the server side
        
    - You may take inspiration from the practicals in weeks 4 and 5
        
    - The server must use node.js
        
- **_Write a site visit counter and display this as part of your application_**
    
    - This really is just a visit counter – a single number
        
    - Please keep this simple – no [Geocities](https://www.stryvemarketing.com/blog/features-of-a-great-90s-website/)
        

- - [Links to an external site.](https://www.stryvemarketing.com/blog/features-of-a-great-90s-website/) flashing please
        
    - You must rely on a Cloud persistence service
        
    - More details of the services available below.
        
- **_‘Dockerise’ the app_**
    
    - Create a Docker container that hosts your app
        
    - Generally using a Dockerfile and `docker build`
        
    - Please talk to us about docker compose
        
- **_Deploy to Amazon Web Services_**
    
    - You must deploy your application to an EC2 instance running Ubuntu 22.04 or later
        
    - You must deploy via a Docker container to get a good mark
        
- **_Write a report_**
    
    - Tell us about the mashup and why it is innovative
        
    - Tell us about the services used
        
    - Tell us how you built it
        
    - Tell us how to use it
        
    - Tell us about the performance metrics related to the services you used
        
- **_Show us that your cloud-based application is functioning_**
    
    - Demonstrations will take place in weeks 9 and 10
        
    - Most of the marking will be face to face, with the rest being via Zoom/Teams
        
    - More information and a schedule will be released at an appropriate time
        

### Your mashup

The notion of a mashup is a combination of individual services to provide a more sophisticated outcome. **This is your chance to be creative and innovative.**

Do not reuse APIs that you have experience with from previous assignments.

In principle, there are few limits on the range of services or applications you may use. We will provide a list of APIs. You are free to use those, but you can also discover some on your own. Most people choose APIs that are of interest to them.

Remember, cloud computing (particularly with AWS) is a sought after skill. Be mindful of how you could use these projects in your resume/cover letter/portfolio.

You should check out your ideas by manually prototyping the workflow. Be sure to apply for any API keys that you need **_immediately_**. These can take (quite some) time. Please tell us about any delays.

We will talk about the mashup in more detail below, but these are the basic guidelines:

- You cannot use existing one-click services.
    
    - This clause is in place to rule out mashup frameworks, and we will leave it in just in case any still survive somewhere.
        
    - Applications must be coded explicitly, and we will only support node-based servers.
        
- Your application must be non-trivial and involve at least 2 services (details below)
    
- Your application must implement at least 2 distinct use cases (details below)
    
- Each use case **_must involve composition of the services._**
    
    - Having a simple web page which displays output from two services with the same search query is insufficient.
        
    - There must be some added value in the results which come back that would otherwise not have been possible.
        
- Your application must involve a significant server side component (details below).
    
    - Some limited mashing on the client side is okay for presentation purposes, but the bulk of the work must happen on the server, and you will find this far more convenient anyway. Trust us on this – it is much easier. If in doubt, ask us.

Your work will be assessed according to its technical merit and usability, and on your ability to document and analyse the application. Naturally, these criteria are made more formal in the assessment rubric. There is no explicit assessment weighting given to the ‘quality of the idea’ as this would be very difficult to isolate.

### The Page Counter

The page counter is included here to allow you to work with at least one cloud persistence service. People come to this unit with a variety of software development backgrounds and some approaches are more familiar than others. The options below are included so as to make it possible for everyone to satisfy the requirements and get the marks. As you will learn soon, the big divide in cloud persistence is between entity or object stores – think <key,value> pairs like a Python dictionary – and relational storage based on SQL databases, whether standalone or part of a managed service.

For this task, you may use a second Docker container (see below) or one of the following managed services in the QUT AWS Environment:

- S3 - [Cloud Object Storage – Amazon S3 – Amazon Web Services](https://aws.amazon.com/s3/)
    

- [Links to an external site.](https://aws.amazon.com/s3/)
    
    - S3 is the Simple Storage Service, one of the original AWS services, providing scalable and highly durable object storage.
        
    - We will teach you how to use S3 programmatically, and after that we will expect you to manage from the AWS guides.
        
- DynamoDB - [Fast NoSQL Key-Value Database – Amazon DynamoDB – Amazon Web Services](https://aws.amazon.com/dynamodb/)
    
- [Links to an external site.](https://aws.amazon.com/dynamodb/)
    
    - DynamoDB is a fast and flexible nonrelational database service for any scale. See RDS, below, if you want to use a relational database.
- RDS – [Fully Managed Relational Database - Amazon RDS - Amazon Web Services](https://aws.amazon.com/rds/)
    

- [Links to an external site.](https://aws.amazon.com/rds/)
    
    - Amazon Relational Database Service (Amazon RDS) is a collection of managed services that makes it simple to set up, operate, and scale databases in the cloud.

We expect the counter to track all the page visits since your application was first deployed. The ideas seem trivial, but it is important to understand the process.

#### **Object approach**

If using S3, you are not incrementing a variable but replacing an object with an updated version. The approach is as follows:

**_Initialise:_**

1. Check that the bucket exists. If not, create it.
    
2. Check that the counter file exists. If not, create a counter object with value zero and upload it to the bucket.
    

**_Visits: For any GET request to the site:_**

1. Access the counter object and parse it to get an integer count.
    
2. Increment the count and create a new string object with the revised count
    
3. Display the current count as part of your application
    

The QUT environment already allows access to S3

#### **Entity approach**

Here we have two options:

1. RDS with a low specification instance as discussed above
    
2. A second Docker container hosting a local instance of MySQL or some other relational DB that you are familiar with. For example, the official MySQL Docker image may be found [here](https://hub.docker.com/_/mysql)
    

1. [Links to an external site.](https://hub.docker.com/_/mysql).
    

For this approach, we will expect that you to have some idea what you are doing with SQL. Your task will involve updating the record that exists in the DB and you will need to make sure that the table structure is set up appropriately.

If you don’t know SQL then use S3 or DynamoDB.

Some comments:

- DynamoDB and RDS will be made available from week 4. There will be restrictions on the instance specification and the images available.
    
- S3 is probably the easiest option, but please pick the alternative that works for you.
    
- In respect to the Docker option, yes, we completely understand that this approach is not stateless and that we are making a compromise here. That’s okay for now.
    
- Finally, Elasticache ([Redis and Memcached-Compatible Cache – Amazon ElastiCache – Amazon Web Services](https://aws.amazon.com/elasticache/)
    

- [Links to an external site.](https://aws.amazon.com/elasticache/)) might be a really good option here, but it is very expensive.
    

Please note that we will give no credit for page visit counters which do not rely on cloud services or a Docker container. If you have a cloud alternative that you are unsure of, please ask a tutor or email [cab432@qut.edu.au](mailto:cab432@qut.edu.au).

### The Target Environment: Docker and the VM

You are required to deploy the app via a Docker container on top of a publicly available Linux VM. Ubuntu has been chosen because of its widespread adoption, and we will allow Ubuntu 22.04.

You may develop the image on a local Linux machine, WSL or a local VM under Virtual Box, or on a cloud instance. The final deployment must be on AWS.

Please talk to your tutor if you are using a Mac – we need to make sure early that your image will run on a standard VM as this has been a problem.

You should already have an AWS account and some experience of deployment. Weeks 2 and 3 practice using Docker and AWS EC2.

More specifically, we require that you set up (i.e., install and configure) your software stack in a Docker container. You should follow a similar strategy to the Docker prac, creating a Dockerfile which will allow you to create an image and to then deploy the container. Please pay _very_ close attention to the port mapping. Hint: sort this out early with a very simple server and then use the same ports and port mappings forever afterwards.

Once the image is created, you should push your Docker image to a **_private_** DockerHub, GitHub or BitBucket repository. Deployment will then be a simple matter of pulling the image from the repo and running it on the target VM. You will need to demonstrate this deployment to us live as part of the marking process, whether face to face or via Zoom or Teams.

The public cloud requirements for this assignment are limited to the use of a Linux VM and some simple persistence as discussed above. There is no need to use multiple instances, a load balancer or any autoscaling strategy. Assignment 2 will be a very different story.

### The Application

In this section, we will give some guidance on your application. The basic guidelines were summarised above for ease of reference. Here we will go into a bit more detail.

**_Service or Data APIs:_**

- Your mashup must involve at least two (2) separate, non-trivial, service and/or data APIs. The combination must make some coherent sense and the APIs must be distinct.
    
- Using two endpoints from the same API is not acceptable. e.g., `GET https://api.spotify.com/v1/me/player` and `GET https://api.spotify.com/v1/me/player/devices` is not acceptable
    
- If you are choosing your own services, talk to the teaching staff as a reality check - especially to check that your service choices are ‘non-trivial’ enough (see below). If you are struggling for inspiration, take your interests into account.
    

**The Use Cases:**

- The mashup service you provide must support at least two (2) non-trivial use cases that make sense for the domain. To make this more concrete, if my mashup focus was to provide restaurant information for tourists (using a search API hitting a site that provides tourist information, coupled with a translation service and a mapping service) then a sensible use case (expressed here as a user story) might be:
    
    > As a tourist in a foreign country I wish to find a restaurant near me and be able to read their menu.
    
- Broadly speaking, we will see the use cases as separate if there is a substantial shift in the underlying service accesses. So a use case in which I am seeking _Thai_ food is NOT different from a use case in which I am seeking Italian food. But seeking Italian food from a restaurant with some minimum government hygiene rating is a different use case from just searching for Thai food. [No, I have no idea if there is a suitable hygiene API – my point is to emphasise that it would require a separate API and more parsing and processing.]
    

**Some Constraints:**

- There must be no cost to QUT for use of your service – so if you wish to use an API that attracts a fee, you may do so, but it is totally at your expense. It should not be necessary in any case.
    
- Request your service accounts and API keys **_as early as possible_**. These may be instantaneous or they may take quite a while. Talk to us early if delays become a problem. Don’t just wait until the day before submission hoping that the key will appear.
    
- Do not commit your API keys to git. Do not hard code your API keys. Your keys must be provided to your application using some flexible mechanism, e.g., using environment variables.
    

**The Server:**

- The actual mashing of the services – the parsing and combination – **_must_** take place largely on the server side. The architecture should be explicit in your proposal and in your final report. As noted, the software stack will be organised through a Docker container, and you will be required to deploy in our presence and to make the app accessible from a public VM. More details on this closer to the submission time.
    
- You must use node.js and base the application on work done in the pracs.
    
- Looking ahead, Node is mandatory for assignment 2 and it is time to get used to it.
    
- The other advantage is that if you complete the server exercise in Prac 4 then you are already most of the way there. This of course is deliberate.
    

**The Client:**

- There is little alternative on the client side to Javascript, but it is _not_ necessary to use a modern UI framework like Vue or React or Angular.
    
- You may base your work on a standard web page layout. You may find Twitter Bootstrap ([http://getbootstrap.com/](http://getbootstrap.com/)
    

- [Links to an external site.](http://getbootstrap.com/)) a good starting point, or you may roll your own based on earlier sites that you have done, or through straightforward borrowing from free CSS sites available on the web. Your site should look clean and be logically organised. You will be marked down if the site is poorly designed and clumsy, but we do not expect professional graphic design. Simple is fine. Cluttered pages with blinking text reminiscent of the 1990s are not.
    
- If you are unsure that your front end is acceptable, do a mock up and show a tutor.
    
- If you don’t know much HTML, talk to us and we will help you get started with resources from W3Schools and CAB230. This won’t take more than a couple of hours at most.
    

**The Report:**

- A significant fraction of the marks for this assignment is based on the report that you submit.
    
- This falls into two distinct parts:
    
    1. A standard software development report
    2. An analysis of your application in response to the questions and prompts that we provide.
- The sections we require are described in detail in the report template and the standards are laid out in the report CRA.
    
- Some aspects of the report appear in the mandatory proposal, discussed below, and you should feel free to use the report template for the proposal to save time later.
    

**The Process:**

- The mashup project is an individual assignment and there is enormous flexibility in the specification.
    
- It is worth 30% of your assessment, so we need to be careful in ensuring that it is of the appropriate standard.
    
- There will be a checkpoint to make sure that you are on track, at which time you will be given clear and unambiguous feedback on whether your proposal is acceptable.
    
- This checkpoint will involve discussion with your tutor, and won’t attract any marks, but please take the opportunity to ensure your submission will be a good one.
    

Please get in touch if you need to clarify any of this.

### Understand performance metrics

You need to be comfortable discussing and writing about the CloudWatch metrics associated with the resources you spin up, particularly the EC2 instance.

Make reference back to the module 3 practical to gain skills in doing this. You will need to demonstrate that you know what the numbers mean.

## **What to submit**

The checkpoint requirements should be seen as drafts of the final report to be submitted as part of the assessment.

#### **Week 5: Mandatory Proposal**

During week 5, and certainly no later than the Sunday evening beginning week 6, we expect you to have provided a proposal of your application. The material you submit as the proposal is not assessed and therefore can be reused in the final report without issue.

The sections required are as follows:

1. **Executive summary**: Overall mashup purpose and description (1-2 paragraphs)
    
2. **System requirements**: At least two non-trivial use cases to be implemented. Please use the user story style:
    
    > As a `<USER-ROLE>` I want the system to `<DO-SOMETHING>` so that `<GOOD-THING-CAN-HAPPEN>`
    
    - For each one of these, you should make it clear how the APIs can support the user story.
3. **Resources**: List of service and data APIs to be utilised. This must include a short description of the API (1-2 sentences is fine), and a list of the services to be used for each user story (see above). You can add an entry here to describe the persistence service used for the page visit counter, but feel free to change your mind later.
    
4. **Architecture**: A clear statement of the division between server side and client side processing, and the technologies to be deployed.
    
5. **Prototype**: [optional] a mock-up of your application page.
    

This is to be submitted via our Microsoft Forms form, which is linked on Canvas. Follow: `Assignments` in the navigation menu, then `CAB432 Mashup/Docker Project`, then click the link.

Your tutor will look at your proposal and if needed, give you quick feedback. If they are unsure of your proposal, they follow up via email or at the next prac. In general, however, the tutor will not message you. After a few days, assume everything is good.

#### **Week 7: Report Draft**

In the week before submission, you should update your proposal and flesh out the details of your application and the analysis we require. The report should follow the guidelines and questions in the report template. You do not need to send this to us, but you should use the last practical before submission as a chance to make sure that things are on track. It will also ensure that you **_actually have a report to submit…_**

#### **Friday, Week 8: Final Submission**

This is the due date for the project. I will expect a completed report, code and tests, along with deployment and execution instructions. Precise requirements are listed below.

#### **Submission**

The project report, source code and a copy of your Dockerfile are to be submitted via Canvas on or before the due date. The report should be submitted as a pdf derived from the report template. We will provide you with a submission link and detailed instructions closer to that time, including a guide to creating an assignment submission zip.

We would like to see some clear organisation of the resources, and we would also like to see some clear separation of the client and server side code. **DON’T** leave your Javascript and CSS in the header of the html page(s).

And as always, don’t ever submit your `node_modules` - just **DON’T do it…**

#### **Feedback**

Under normal circumstances, you will receive marks for each criterion via a Canvas rubric within 10-15 working days of submission. Click on Marks to see your results. Usually the reason for each choice of mark is self-evident, the marker will include some written feedback about your performance. You should use this feedback to strengthen your performance in the next assessment item.

#### **Moderation**

All staff who are assessing your work meet to discuss and compare their judgements before marks or grades are finalised.

# Appendix

## **List of APIs for inspiration**

_We provide no guarantee that these APIs will be functioning when your submission is marked._

_Use your judgement when selecting APIs. Read their documentation and notices._

 
|Service|URL|
|---|---|
|TasteDive|[https://tastedive.com/read/api](https://tastedive.com/read/api)|
|Ticketmaster|[https://developer.ticketmaster.com/products-and-docs/apis/getting-started/](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/)|
|Google Places|[https://developers.google.com/maps/documentation/places/web-service/overview](https://developers.google.com/maps/documentation/places/web-service/overview)|
|Weatherbit|[https://www.weatherbit.io/api](https://www.weatherbit.io/api)|
|Flickr|[https://www.flickr.com/services/api/](https://www.flickr.com/services/api/)|
|Eonet|[https://eonet.gsfc.nasa.gov/docs/v3](https://eonet.gsfc.nasa.gov/docs/v3)|
|Leaflet|https://leafletjs.com/reference.html|
|Random date generator|[https://api.lrs.org/docs/random-date-generator](https://api.lrs.org/docs/random-date-generator)|
|IEEE|[https://developer.ieee.org/docs](https://developer.ieee.org/docs)|
|arXiv|[https://arxiv.org/help/api/user-manual](https://arxiv.org/help/api/user-manual)|
|Financial Modeling Prep|[https://site.financialmodelingprep.com/developer/docs/](https://site.financialmodelingprep.com/developer/docs/)|
|Marketaux|[https://www.marketaux.com/documentation](https://www.marketaux.com/documentation)|
|Wikimedia|https://en.wikipedia.org/api/rest_v1/|
|Namsor|[https://namsor.app/api-documentation/#name-origin-batch](https://namsor.app/api-documentation/#name-origin-batch)|
|Edaman|[https://developer.edamam.com/edamam-docs-recipe-api](https://developer.edamam.com/edamam-docs-recipe-api)|
|Mapbox|[https://docs.mapbox.com/mapbox-gl-js/](https://docs.mapbox.com/mapbox-gl-js/)|
|Yahoo Finance|[https://syncwith.com/yahoo-finance/yahoo-finance-api](https://syncwith.com/yahoo-finance/yahoo-finance-api)|
|API Ninjas|[https://api-ninjas.com/api/celebrity](https://api-ninjas.com/api/celebrity)|
|News API|[https://newsapi.org/docs/endpoints](https://newsapi.org/docs/endpoints)|
|GeoDB|[http://geodb-cities-api.wirefreethought.com/docs/api/find-cities](http://geodb-cities-api.wirefreethought.com/docs/api/find-cities)|
|OpenWeather|[https://openweathermap.org/history](https://openweathermap.org/history)|
|LastFM|https://www.last.fm/api/show/track.getSimilar|
|Quickchart|[https://quickchart.io/documentation/word-cloud-api/](https://quickchart.io/documentation/word-cloud-api/)|
|DeepAi text2img|[https://deepai.org/machine-learning-model/text2img](https://deepai.org/machine-learning-model/text2img)|
|Google Books|https://developers.google.com/books/docs/overview|
|YouTube|[https://developers.google.com/youtube/v3](https://developers.google.com/youtube/v3)|
|Sunrise and Sunset|[https://api.sunrise-sunset.org/json](https://api.sunrise-sunset.org/json)|
|Open Route Service|[https://api.openrouteservice.org/](https://api.openrouteservice.org/)|
|IP Info|https://ipinfo.io/developers|
|Timezone|[https://www.abstractapi.com/api/time-date-timezone-api#docs](https://www.abstractapi.com/api/time-date-timezone-api#docs)|
|Orb intelligence|[https://api.orb-intelligence.com/docs/](https://api.orb-intelligence.com/docs/)|
|Phishing check|[https://rapidapi.com/Amiichu/api/exerra-phishing-check](https://rapidapi.com/Amiichu/api/exerra-phishing-check)|
|Open Notify|[https://open-notify.org](https://open-notify.org)|
|Open Street Map|[https://www.openstreetmap.org/help](https://www.openstreetmap.org/help)|
|Disease.sh|[https://disease.sh/docs/#/](https://disease.sh/docs/#/)|

_Feel free to contribute to this list by contacting the teaching team._

## **Lists of lists of APIs for inspiration**

_We have vetted these links but be aware that these lists may contain APIs that are not suitable for the assignment._

_Use your judgement when choosing APIs. Read the documentation and notices of the APIs you select._

 
|List|Link|
|---|---|
|GitHub: `public-apis / public-apis`|[https://github.com/public-apis/public-apis](https://github.com/public-apis/public-apis)|
|GitHub: `trntv / apis-list`|[https://github.com/trntv/apis-list](https://github.com/trntv/apis-list)|
|API List dot fun|[https://apilist.fun/](https://apilist.fun/)|

_Feel free to contribute to this list by contacting the teaching team._

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
