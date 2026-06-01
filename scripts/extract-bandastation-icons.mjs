import { spawnSync } from "node:child_process";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import zlib from "node:zlib";

const systemRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bandastationRoot = path.resolve(systemRoot, "..", "BandaStation");
const objIconsRoot = path.join(bandastationRoot, "icons", "obj");
const outputRoot = path.join(systemRoot, "icons", "items", "bandastation");
const itemsPath = path.join(systemRoot, "items.json");

const ICONS = {
  taser: ["weapons/guns/energy.dmi", "taser"],
  stun_baton: ["weapons/baton.dmi", "stunbaton"],
  flash: ["devices/flash.dmi", "flash"],
  handcuffs: ["weapons/restraints.dmi", "handcuff"],
  emag: ["card.dmi", "emag"],
  energy_sword: ["weapons/transforming_energy.dmi", "e_sword_on"],
  revolver_357: ["weapons/guns/ballistic.dmi", "revolver"],
  wrench: ["tools.dmi", "wrench"],
  multitool: ["devices/tool.dmi", "multitool"],
  hypospray: ["medical/syringe.dmi", "hypo"],
  oxygen_tank: ["canisters.dmi", "oxygen"],
  assistant_uniform: ["clothing/under/color.dmi", "jumpsuit"],
  security_armor: ["clothing/suits/armor.dmi", "armor_sec"],
  assistant_id: ["storage/box.dmi", "id"],
  security_id: ["storage/box.dmi", "id"],
  captain_id: ["storage/box.dmi", "id"],
  engineer_uniform: ["clothing/under/engineering.dmi", "engine"],
  medical_uniform: ["clothing/under/medical.dmi", "medical"],
  research_uniform: ["clothing/under/rnd.dmi", "science"],
  security_helmet: ["clothing/head/helmet.dmi", "helmet"],
  security_gloves: ["clothing/gloves.dmi", "sec"],
  engineer_boots: ["clothing/shoes.dmi", "workboots"],
  medical_boots: ["clothing/shoes.dmi", "sneakers"],
  health_analyzer: ["devices/scanner.dmi", "health"],
  medical_kit: ["storage/medkit.dmi", "medkit"],
  cable_coil: ["devices/assemblies.dmi", "valve_cables"],
  power_cell: ["devices/circuitry_n_data.dmi", "cell"],
  mop: ["service/janitor.dmi", "mop"],
  chef_knife: ["service/kitchen.dmi", "knife"],
  pda: ["devices/modular_pda.dmi", "pda"],
  disabler: ["weapons/guns/energy.dmi", "advtaser_disable"],
  laser_gun: ["weapons/guns/energy.dmi", "laser"],
  shotgun: ["weapons/guns/ballistic.dmi", "shotgun"],
  ammo_357: ["weapons/guns/ammo.dmi", "38-laser-1"],
  ammo_shells: ["weapons/guns/ammo.dmi", "gshell"],
  energy_cells: ["machines/cell_charger.dmi", "cell"],
  radio_headset: ["clothing/headsets.dmi", "headset"],
  secrecy_briefcase: ["storage/case.dmi", "briefcase"],
  screwdriver: ["tools.dmi", "screwdriver"],
  crowbar: ["tools.dmi", "crowbar"],
  wirecutters: ["tools.dmi", "cutters"],
  welding_tool: ["tools.dmi", "welder"],
  toolbox_mechanical: ["storage/toolbox.dmi", "toolbox_default"],
  utility_belt: ["clothing/belts.dmi", "utility"],
  insulated_gloves: ["clothing/gloves.dmi", "yellow"],
  hard_hat: ["clothing/head/utility.dmi", "hardhat0_yellow"],
  meson_scanner: ["clothing/glasses.dmi", "meson"],
  fire_extinguisher: ["wallmounts.dmi", "extinguisher"],
  rapid_cable_layer: ["devices/assemblies.dmi", "valve_cables"],
  defibrillator: ["medical/defib.dmi", "defibunit"],
  syringe: ["medical/syringe.dmi", "syringe_0"],
  medipen: ["medical/syringe.dmi", "medipen"],
  brute_patch: ["medical/chemical.dmi", "bandaid_brute"],
  burn_patch: ["medical/chemical.dmi", "bandaid_burn"],
  first_aid_kit: ["storage/medkit.dmi", "medkit"],
  medical_belt: ["clothing/belts.dmi", "medical"],
  medical_glasses_hud: ["clothing/glasses.dmi", "healthhud"],
  body_bag: ["medical/bodybag.dmi", "bodybag_folded"],
  security_belt: ["clothing/belts.dmi", "security"],
  pepper_spray: ["medical/chemical.dmi", "pepperspray"],
  seclite: ["lighting.dmi", "seclite"],
  forensic_scanner: ["devices/scanner.dmi", "forensicnew"],
  evidence_bag: ["storage/storage.dmi", "evidenceobj"],
  security_sunglasses: ["clothing/glasses.dmi", "securityhud"],
  combat_knife: ["weapons/stabby.dmi", "survivalknife"],
  energy_gun: ["weapons/guns/energy.dmi", "laser"],
  science_goggles: ["clothing/glasses.dmi", "scihudnight"],
  analyzer: ["devices/scanner.dmi", "analyzer"],
  beaker: ["medical/chemical.dmi", "beaker"],
  large_beaker: ["medical/chemical.dmi", "beakerlarge"],
  dropper: ["medical/chemical.dmi", "dropper0"],
  plant_analyzer: ["devices/scanner.dmi", "fish_analyzer"],
  mining_scanner: ["devices/scanner.dmi", "miner_aid"],
  kinetic_accelerator: ["weapons/guns/ballistic.dmi", "cshotgun"],
  mining_pickaxe: ["mining.dmi", "pickaxe"],
  ore_bag: ["mining.dmi", "satchel"],
  cargo_headset: ["clothing/headsets.dmi", "cargo_headset"],
  engineering_headset: ["clothing/headsets.dmi", "eng_headset"],
  medical_headset: ["clothing/headsets.dmi", "med_headset"],
  science_headset: ["clothing/headsets.dmi", "sci_headset"],
  security_headset: ["clothing/headsets.dmi", "sec_headset"],
  command_headset: ["clothing/headsets.dmi", "com_headset"],
  backpack: ["storage/backpack.dmi", "backpack"],
  satchel: ["storage/backpack.dmi", "satchel-norm"],
  duffel_bag: ["storage/backpack.dmi", "duffel"],
  breath_mask: ["medical/surgery_table.dmi", "mask_breath"],
  gas_mask: ["clothing/masks.dmi", "gas_mask"],
  emergency_oxygen_tank: ["canisters.dmi", "oxygen_f"],
  janicart_keys: ["storage/box.dmi", "id"],
  soap: ["watercloset.dmi", "soap"],
  spray_bottle: ["medical/chemical.dmi", "sprayer_med_blue"],
  botany_hatchet: ["service/hydroponics/equipment.dmi", "hatchet"],
  rolling_pin: ["service/kitchen.dmi", "rolling_pin"],
  tray: ["service/janitor.dmi", "tray"]
};

function readDescription(filePath) {
  const buffer = fs.readFileSync(filePath);
  let offset = 8;
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + length);

    if (type === "zTXt" || type === "tEXt") {
      const zero = data.indexOf(0);
      const key = data.subarray(0, zero).toString();
      if (key === "Description") {
        return type === "zTXt"
          ? zlib.inflateSync(data.subarray(zero + 2)).toString()
          : data.subarray(zero + 1).toString();
      }
    }

    offset += length + 12;
  }
  throw new Error(`No DMI metadata found in ${filePath}`);
}

function parseDmi(filePath) {
  const source = fs.readFileSync(filePath);
  const sheetWidth = source.readUInt32BE(16);
  const description = readDescription(filePath);
  const dmi = { width: 32, height: 32, states: new Map() };
  let current = null;

  for (const rawLine of description.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || line.startsWith("version")) continue;

    const [key, value] = line.split(" = ");
    if (key === "width" || key === "height") {
      dmi[key] = Number(value);
      continue;
    }
    if (key === "state") {
      current = {
        name: value.slice(1, -1).replace(/\\"/g, "\"").replace(/\\\\/g, "\\"),
        dirs: 1,
        frames: 1,
        start: 0
      };
      dmi.states.set(current.name, current);
      continue;
    }
    if (!current) continue;
    if (key === "dirs" || key === "frames") current[key] = Number(value);
  }

  let index = 0;
  for (const state of dmi.states.values()) {
    state.start = index;
    index += state.dirs * state.frames;
  }

  dmi.columns = Math.floor(sheetWidth / dmi.width);
  return dmi;
}

const items = JSON.parse(fs.readFileSync(itemsPath, "utf8"));
const jobs = [];

for (const item of items.items) {
  const icon = ICONS[item.id];
  if (!icon) throw new Error(`No BandaStation icon mapping for item id '${item.id}'`);

  const [relativeDmi, stateName] = icon;
  const source = path.join(objIconsRoot, relativeDmi);
  if (!fs.existsSync(source)) throw new Error(`Missing BandaStation icon file: ${source}`);

  const dmi = parseDmi(source);
  const state = dmi.states.get(stateName);
  if (!state) throw new Error(`Missing state '${stateName}' in ${source}`);

  const output = path.join(outputRoot, `${item.id}.png`);
  const tile = state.start;
  jobs.push({
    source,
    out: output,
    x: (tile % dmi.columns) * dmi.width,
    y: Math.floor(tile / dmi.columns) * dmi.height,
    width: dmi.width,
    height: dmi.height
  });
  item.img = `systems/ss13/icons/items/bandastation/${item.id}.png`;
}

fs.mkdirSync(outputRoot, { recursive: true });

const jobsPath = path.join(systemRoot, ".bandastation-icon-jobs.json");
fs.writeFileSync(jobsPath, JSON.stringify(jobs, null, 2));

const cropper = path.join(systemRoot, "scripts", "crop-dmi-icons.ps1");
const result = spawnSync("powershell.exe", [
  "-NoProfile",
  "-ExecutionPolicy",
  "Bypass",
  "-File",
  cropper,
  "-JobsPath",
  jobsPath
], { stdio: "inherit" });

fs.rmSync(jobsPath, { force: true });

if (result.status !== 0) {
  throw new Error(`Icon cropper failed with exit code ${result.status}`);
}

fs.writeFileSync(itemsPath, `${JSON.stringify(items, null, 2)}\n`);
console.log(`Extracted ${jobs.length} BandaStation item icons.`);
