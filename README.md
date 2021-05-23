# er-map
ER embeddable map

### Configuration File
#### Structure
    {
        "server": <domain>,
        "map_title": <name>,
        "color_scheme": <"aquatic" | "earthtones" | [array of hex values ex: "#00374"]>,
        "map": {
            "center": [<longitude>, <latitude>],
            "zoom": <number in range 0-22>,
            "subject_names": <boolean for displaying labels under icons>
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

The only required field is the server domain, all other fields can be deleted. To add more subjects, simply add another \<subject id\> and its associated data.

#### Default Values
- map_title: "Animal Tracker"
- color_scheme: "earthtones"
- map.center: [-109.3666652, -27.1166662] (Easter Island)
- map.zoom: 11
- map.subject_names: false

- name: the name from EarthRanger
- age: ""
- icon: either a realistic image of the animal based on its common_name from EarthRanger (if we have an associated image) or its image from EarthRanger
- pictures: none
- fun_fact: ""
- detail_description: ""
