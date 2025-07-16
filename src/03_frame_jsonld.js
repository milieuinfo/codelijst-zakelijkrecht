import fs from "fs";
import jsonld from "jsonld";
import {  n3_reasoning } from 'maven-metadata-generator-npm';
import { frame_concept_via_collectie, frame_concept_via_conceptscheme} from './utils/variables.js';


console.log = function() {}

async function frame(json) {
    const nace_nt = await n3_reasoning(json, ["/n3/skos-rules.n3"])
    let my_json = await jsonld.fromRDF(nace_nt);
    const framed = await jsonld.frame(my_json, frame_concept_via_collectie)
    fs.writeFileSync('./main/resources/be/vlaanderen/omgeving/data/id/conceptscheme/zakelijkrecht/zakelijkrecht_concepten.jsonld', JSON.stringify(framed, null, 4));
    fs.writeFileSync('./main/resources/be/vlaanderen/omgeving/data/id/conceptscheme/zakelijkrecht/zakelijkrecht_conceptscheme_topconcept_narrower.jsonld', JSON.stringify(await jsonld.frame(my_json, frame_concept_via_conceptscheme), null, 4));
}

fs.readFile('./main/resources/be/vlaanderen/omgeving/data/id/conceptscheme/zakelijkrecht/zakelijkrecht.jsonld', function(err, data) {
    if (err) throw err;
    frame(JSON.parse(data))
});

