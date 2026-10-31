A Tekla Structures package should state what is modelled and to what level of detail, which Tekla version and environment the native model must open in, which exchange files are required (IFC, DWG/DXF, PDF, DSTV NC), how numbering and phasing are set up, and whether fabrication drawings are part of the scope. "Tekla model" on its own means very different things to different suppliers.

## Model-only vs model-plus-drawings

| Scope type | Typical content | Typical use |
|---|---|---|
| Coordination model | Main members, approximate connections, correct envelopes | Clash checking, layout, piping coordination |
| Detailing model | All parts, bolts, welds and fittings; numbered | Basis for fabrication drawings and NC data |
| Model plus drawings | Detailing model plus [assembly, single-part and erection drawings](/resources/steel-drawing-types-explained) | Full fabrication package |
| Model update | Revisions to an existing client model | Brownfield or design changes |

At {brand} we state this explicitly: [fabrication drawings](/services/steel-detailing-fabrication) are additional unless they are included in the model scope.

## Define the modelling scope and level of detail

Write down:

- **Structures included:** for example racks PR-01 to PR-04, platforms P-101 to P-108.
- **Elements included:** primary steel, secondary steel, grating, handrails, stairs, ladders, pipe support steel, embeds.
- **Connection detail:** full connection modelling, or simplified representations for coordination.
- **Non-steel items:** concrete foundations as reference objects, equipment as reference models.
- **Level of detail:** if you use LOD/LOI terminology, attach a definition. LOD labels are interpreted differently between organisations.

## Version and licence compatibility

Tekla Structures is released in yearly versions; Trimble's documentation currently covers Tekla Structures 2026. Trimble's documentation states that Tekla Structures versions "are not backwards compatible": a saved model cannot be opened in older versions because of database differences. If your fabricator or EPC team uses a specific version, the supplier must model in that version or one you can open. Also confirm the environment (region and role settings), any firm folder, and the custom components or profiles your project uses. Mismatched environments produce different profiles, materials and drawing styles.

## Exchange formats

Trimble lists the formats Tekla Structures can import and export. The common ones for industrial steel packages are:

| Format | Typical purpose | Notes |
|---|---|---|
| Native Tekla model | Ongoing detailing, future revisions | Version-dependent; agree ownership |
| IFC (IFC2x3 / IFC4) | Coordination with plant design and other BIM tools | Agree the property sets required |
| DWG / DXF | 2D drawings for CAD users; DXF for plate nesting | Agree the layering and the export template |
| PDF | Review and issue drawings | Include revision and status |
| DSTV NC (.nc1) | CNC machine data for profiles and plates | Tekla does not create DSTV NC files for curved beams, because the DSTV standard does not support them. Plates can be converted to DXF where the shop requires it |
| Reports (CSV/XLSX/PDF) | Member, bolt and part lists; [MTO](/resources/structural-steel-material-take-off-guide) | Agree the template columns |

## Numbering, phases and reports

Numbering assigns marks to identical parts and assemblies and must be complete before shop drawings are created. Agree the following in advance:

- the prefix and start-number convention by structure or area;
- whether phases represent areas, erection sequence or shipping lots;
- report templates for the MTO, bolt lists and assembly lists.

Changing the numbering convention halfway through a project is expensive, because it ripples through every drawing.

## Handover checklist

- [ ] Native model in the agreed version, with the model folder and any custom attributes
- [ ] IFC export with the agreed property sets
- [ ] Drawings in PDF and DWG (if in scope), with a drawing register
- [ ] NC files organised by part mark
- [ ] Reports in the agreed templates
- [ ] List of custom components used and any limitations
- [ ] Open assumptions and holds list

## Frequently asked questions

**Can you work inside our existing Tekla model?**
Often yes, by agreement. This requires a compatible version, a shared environment and a clear process for model sharing or merging.

**Do we need IFC if we have the native model?**
Usually, yes. Plant design and coordination tools commonly consume IFC rather than native Tekla files.

**Are NC files always included?**
No. NC data is a separate deliverable and should be requested explicitly, with the CNC format your shop uses.

## Next step

Confirm your Tekla version, environment and deliverables with us before scoping. See [3D structural modelling and plant model support](/services/plant-structural-3d-modelling) or [confirm your setup](/contact).
