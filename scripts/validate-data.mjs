import fs from "node:fs";

const jsonFiles = ["system.json", "template.json", "items.json", "lang/ru.json", "lang/en.json"];
for (const file of jsonFiles) {
  JSON.parse(fs.readFileSync(file, "utf8"));
}

const template = JSON.parse(fs.readFileSync("template.json", "utf8"));
const items = JSON.parse(fs.readFileSync("items.json", "utf8")).items ?? [];
const actorSource = fs.readFileSync("scripts/actor.js", "utf8");
const moduleSource = fs.readFileSync("module.js", "utf8");
const skills = Object.keys(template.Actor.character.skills);
const skillSet = new Set(skills);

const missingInModule = skills.filter((skill) => !moduleSource.includes(`${skill}: { rank: 0`));
const missingInActor = skills.filter((skill) => !actorSource.includes(`${skill}: { rank: 0`));
const badItemSkills = items
  .filter((item) => item.system?.skill && !skillSet.has(item.system.skill))
  .map((item) => `${item.id}:${item.system.skill}`);

const professionBlock = actorSource.match(/const PROFESSION_TEMPLATES = \{([\s\S]*?)\n\};/)?.[1] ?? "";
const professionSkillRefs = [...professionBlock.matchAll(/skills: \{([^}]*)\}/g)]
  .flatMap((match) => [...match[1].matchAll(/([a-z_]+): \d/g)].map((skillMatch) => skillMatch[1]));
const badProfessionSkills = professionSkillRefs.filter((skill) => !skillSet.has(skill));

const errors = [
  ...missingInModule.map((skill) => `module.js missing skill: ${skill}`),
  ...missingInActor.map((skill) => `scripts/actor.js missing skill: ${skill}`),
  ...badItemSkills.map((skill) => `items.json unknown skill: ${skill}`),
  ...badProfessionSkills.map((skill) => `profession unknown skill: ${skill}`)
];

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`OK: ${skills.length} skills, ${items.length} items`);
