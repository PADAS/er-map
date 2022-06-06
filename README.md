# Earth Ranger Embeddable Map

## Table of Contents
- [Earth Ranger Embeddable Map](#earth-ranger-embeddable-map)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [Configuration](#configuration)
    - [File Structure](#file-structure)
    - [Fields](#fields)
    - [Important Notes](#important-notes)
  - [Development](#development)
    - [Install dependencies](#install-dependencies)
    - [Build](#build)
    - [Run locally](#run-locally)
  - [Maintainers](#maintainers)

## Introduction
This embeddable map allows clients to customize and configure how they portray animal tracking data.
The animal tracking data is provided by the client's EarthRanger server and the module constructs a default map described below. Read the [Configuration](#Configuration) section below to learn more about customizing your map.

## Installation
1. Go to https://github.com/PADAS/er-map/releases and download the lastest release
2. Copy the build directory from the download into the public folder of your source code

## Quick Start
1. Create an iFrame to embed the map into, letting the src variable be
~~~
src={`${process.env.PUBLIC_URL}/build/index.html`}
~~~
2. Edit public/config/config.json in the build folder to specify your server name
4. Run your website and see our default map

Next steps: finish personalizing your Earth Ranger Embeddable Map by filling out the remainder of config.json.

## Configuration
### File Structure
    {
        "server": <domain>,
        "public_name": <public_name>,
        "map_title": <name>,
        "color_scheme": <"aquatic" | "earthtones" | [array of hex values]>,
        "map": {
            "center": [<longitude>, <latitude>],
            "zoom": <number in range 0-22>,
            "show_subject_names": <boolean for displaying labels under icons>,
            "simplify_map_data": <boolean, when true hide icons as map is zoomed out>,
            "map_icon_size": <number>
        },
        "subjects":
        {
            <subject id>:
            {    
                "name": <subject name>,
                "age": <subject age>,
                "icon": <url/path to icon image (.png/.jpg only)>,
                "pictures":
                [
                    {
                        "path": <url/path to image (any extension supported by HTML)>
                    }
                ],
                "fun_fact": <fun fact about the subject>,
                "detail_description": <simple html content, wrapped in quotes>
            }
        }
    }

### Fields
\* = required
- *server: the server we set up for you
    - e.g.: "ermap-server-sandbox.pamdas.org"
- *public_name: name of public presentation of data, path on server to movement data
- map_title: the name of the map that appears in the legend
    - default: "Animal Tracker"
- color_scheme: an array of hex colors used for bullets in the legend and displaying the track of the associated subject
    - presets:
        - "earthtones": shades of red/orange/brown
        - "aquatic": shades of blue/green
    - default: "earthtones"
    - e.g.: ["#00374", "#005B70", "#219DB8", "#511913", "#711E17", "#961F1A"]
- map.center: the initial center coordinates displayed on the map, [longitude, latitude]
    - default: [-109.3666652, -27.1166662] (Easter Island)
- map.zoom: the initial zoom level of the map in the range 0-22, higher numbers are more zoomed out
    - default: 11
- map.show_subject_names: a boolean for whether or not to diplay subject names below their icons on the map
    - default: false
- map.simplify_map_data: a boolean for reducing icons on map as the map is zoomed out
    - default: true
- map.map_icon_size: number to advise on the subject icon size
    - default: 30
- \<subject id>: the id of a subject in EarthRanger
- \<subject id>.name: a new name for the subject
    - default: the subject's name from EarthRanger
- \<subject id>.age: the subject's age
    - default: ""
- \<subject id>.icon: an image to be used as the subject's icon on the map
    - default: a photorealistic image of the animal based on its common_name from EarthRanger (if we have an associated image), otherwise its icon from EarthRanger
    - <b>must not be a .svg</b>
- \<subject id>.pictures.path: an image to be displayed in the subject's legend. The 1st image (if one is provided) is used in the subject's popup
- \<subject id>.fun_fact: a short fun fact about the subject to be displayed in its popup
    - default: ""
- detail_description: simple HTML content wrapped in a string to be displayed as a subject's story
    - default: ""

### Important Notes
The only required fields are the server domain and public_name, all other fields can be deleted or marked as <code>null</code> to use the default value.

To add more subjects, simply add another \<subject id\> and its associated data.

In order for a subject to have a story, it must either have picture(s) or a detailed description.

## Development
A few commands for local development
### Install dependencies
~~~
yarn install
~~~
### Build
~~~
yarn build
~~~
### Run locally
~~~
yarn start
~~~
## Maintainers
Manasi Shah, Zage Strassberg-Phillips, Lauren Vreeken
