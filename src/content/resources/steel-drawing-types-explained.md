Each steel drawing type answers a different question. A general arrangement (GA) drawing shows where the structure is and how it is laid out. Assembly drawings tell the shop how to build one shipping piece. Single-part drawings define one plate or profile. Erection drawings tell the site where each marked piece goes. Asking for the right combination at RFQ stage avoids paying for drawings nobody uses, and avoids missing the ones the shop needs.

## Quick comparison

| Drawing type | Question it answers | Typical content | Primary user |
|---|---|---|---|
| General arrangement (GA) | What is the overall layout? | Grids, levels, member positions and sizes, plans, elevations, sections | Engineering, coordination, site |
| Assembly drawing | How is this shipping piece made? | Main member with fittings, dimensions, welds, holes, part list | Fabrication shop |
| Single-part drawing | How is this part cut and drilled? | One plate or profile: dimensions, holes, bevels, material | Cutting, drilling, plate shop |
| Erection drawing / erection GA | Where does each piece go on site? | Piece marks in position, field bolts, levels, erection notes | Erector, site supervision |
| Anchor bolt / embedment plan | What must be cast into concrete? | Anchor and embed locations, projections, levels | Civil contractor |
| Multi-drawing | Can several small parts share a sheet? | Several single-part or assembly views on one sheet | Shop (efficiency) |

## General arrangement drawings

On a steel detailing package, a GA drawing shows the structure as a whole: plans at key levels, elevations along grid lines, and sections through bays. It locates members by grid and level and identifies them by size or mark. On many projects the engineer's design GA is an input, and the detailer's erection GA is an output. Clarify which one your RFQ means.

## Assembly drawings

An assembly drawing (often what people mean by "shop drawing") shows a single shipping piece. That is usually a main beam, column or brace with all its shop-welded or shop-bolted fittings: cleats, stiffeners, base plates, end plates. It gives overall and hole dimensions, weld symbols, part marks and a bill of material for that assembly. Trimble describes assembly drawings as "typically workshop drawings showing fabrication information for one assembly", made up of a main part and secondary parts.

## Single-part drawings

A single-part drawing describes one part only: a plate with its outline, holes and bevels, or a profile with its cut length, end preparations and holes. Shops that cut and drill parts before assembly rely on them, as do shops sending plate work to a separate cutting facility. Where the shop uses CNC equipment, single-part information may also be delivered as NC files.

## Erection drawings

Erection drawings show where each assembly mark sits in the structure, which bolts are installed in the field, any erection sequence notes, and levels or setting-out information. ANSI/AISC 303-22 treats shop drawings and erection drawings as separate approval documents. Temporary erection bracing drawings are a separate item again, prepared by the erector. Under European execution standards, temporary works responsibilities are similarly defined in the execution specification and contract.

## Anchor bolt and embedment plans

Before steel arrives, the civil contractor must cast anchor bolts and embedded plates in the right place. Anchor bolt plans and embedment drawings show those items with locations, projections and levels. They are often needed earlier than any other steel drawing, so schedule them first.

## Multi-drawings and schedules

Small parts such as clips, plates and brackets can be grouped on multi-drawings to reduce sheet count. Schedules (member lists, bolt lists, part lists and MTOs) summarise quantities across the package and are often required by procurement before shop drawings are complete.

## How drawing types relate in a model-based workflow

In a [model-based workflow](/resources/tekla-model-deliverables-guide), the 3D detailing model is the single source for every drawing type. Before single-part, assembly or cast unit drawings can be created in Tekla Structures, the model must be numbered: Trimble's documentation says numbering "is a prerequisite". Identical parts and assemblies receive the same mark, and only one drawing is created for each unique mark. That is why a 40-bay pipe rack may need far fewer assembly drawings than its piece count suggests. It is also why late changes to "identical" pieces must be handled carefully, since a changed piece needs a new mark.

## Choosing the right set for your package

- Need the shop to fabricate? Request **assembly drawings**, plus **single-part drawings** if parts are cut separately.
- Need site to erect? Request **erection drawings** with field bolt lists.
- Concrete still to be poured? Request **anchor bolt/embedment plans** first.
- Procurement ordering early? Request an **[advance MTO or member list](/resources/structural-steel-material-take-off-guide)**.
- Engineering coordination only? A **model and GA** may be enough, with no shop drawings.

## Frequently asked questions

**Is a shop drawing the same as an assembly drawing?**
In everyday use, "shop drawings" usually means assembly drawings, and sometimes single-part drawings too. Define the terms in your scope so both parties mean the same set.

**Who prepares erection drawings?**
Normally the detailer working for the fabricator, unless the contract says otherwise. Temporary erection bracing is a separate responsibility.

**Can we receive only the model and no drawings?**
Yes, where the fabricator works directly from model data and the contract accepts digital fabrication models as approval documents. Agree this explicitly.

## Next step

Tell us which drawing types your package needs, and we will confirm the deliverables list before quoting. See [structural steel detailing and fabrication documentation](/services/steel-detailing-fabrication) and [civil and structural drafting](/services/civil-structural-drafting), or [request a project quote](/contact).
