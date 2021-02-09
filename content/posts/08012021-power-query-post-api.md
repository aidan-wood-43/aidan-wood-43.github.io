---
title: "Connecting Power BI to a Post API with Power Query"
date: 2021-01-08T19:03:42Z
draft: false
description: "Explanation of a simple Power Query script to pull data from a Post API into Power BI"
categories:
  - "Business Intelligence"
tags:
  - "Power BI"
  - "Power Query"
  - "API"
menu: main # Optional, add page to a menu. Options: main, side, footer

# Theme-Defined params
#thumbnail: "img/placeholder.jpg" # Thumbnail image
#lead: "Example lead - highlighted near the title" # Lead text
#comments: false # Enable Disqus comments for specific page
#authorbox: true # Enable authorbox for specific page
#pager: true # Enable pager navigation (prev/next) for specific page
#toc: true # Enable Table of Contents for specific page
#mathjax: true # Enable MathJax for specific page
#sidebar: "right" # Enable sidebar (on the right side) per page
#widgets: # Enable sidebar widgets in given order per page
#  - "search"
#  - "recent"
#  - "taglist"
---

Recently I had to configure a Power BI data source to pull data from a POST api. The ability to construct a POST request isn't natively available as part of any default or third party connector on Power BI, so I had to construct the query in Power BI. The process isn't too involved and hopefully this helps anyone facing a similar problem.

As a Power BI / Power Query / BI / general novice, I made extensive use of an excellent blog post by [Chris Webb](https://blog.crossjoin.co.uk/2014/04/19/web-services-and-post-requests-in-power-query/) - check it out for further context on the solution. The key turns out to be using the [Web.Contents](http://Web.Contents) function with the Content option which forces the function to make a POST request as opposed to its default GET request. 

Below is a template to make the API request and deliver a JSON payload containing the API key. It additionally tells Power Query to extract the JSON content returned from the request, but this may or may not be needed depending on how the API is setup.

{{< gist aidan-wood-43 13f921f3d84223b2b06a6f810fd95d38 >}}