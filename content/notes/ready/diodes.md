---
title: Diodes
description: 
draft: false
tags:
  - electronics
author: TrudeEH
showToc: true
---



A diode allows current to only flow in one direction in a circuit.

## Schematic

```Plain
Anode (+) --|>|-- Cathode (-)
```

## Examples

```Plain
[Conventional Current (+) -> (-)]
(+)------|>|------(-)   Current can flow - The diode is now a conductor.
(+)------|<|------(-)   Current can't flow - The diode is now an insulator.
```

## Use Cases

- Protect a circuit (if a battery is connected incorrectly, for example)
- Convert AC to DC current  
Fun fact: An LED, for example, is a Light-Emitting Diode.

## How a Diode Works

### Conductors and Insulators

An atom contains the following elements:
- Nucleus (Protons - Neutrons)
- Orbital Shells (Holds the electrons, which orbit around the nucleus)
- Conduction band  
The electrons closest to the nucleus hold the most energy.  
The outermost shell is the valence shell. A conductor has 1-3 electrons in the valence shell.  
If an electron reaches the conduction band, it can break free and move to another atom.  
An insulator, however, has a conduction band that is far from the valence shell, making it difficult for an electron to escape.  
For example, for copper (a great conductor), the valence shell and conduction band overlap, so it's very easy for an electron to jump between atoms.  
Semiconductors have a conduction band close to the valence shell, but have one extra electron in it, making it an insulator. However, given some external energy, some electrons will gain enough energy to reach the conduction band and become free.

### P-Type and N-Type Doping

Silicon is a good semiconductor, having 4 electrons in its valence shell. When close to other `Si` atoms, they share 4 electrons with their neighbors, thus, having 8, each, and becoming stable.

```Plain
Silicon:
Si Si Si Si Si Si Si Si Si Si Si
Si Si Si Si Si Si Si Si Si Si Si
Si Si Si Si Si Si Si Si Si Si Si
Si Si Si Si Si Si Si Si Si Si Si
Si Si Si Si Si Si Si Si Si Si Si
Si Si Si Si Si Si Si Si Si Si Si
```

#### N-Type

Some Phosphorus is added to the Silicon. ==`p`== has one extra electron in its valence shell.  
These electrons are not needed, and so, they flow freely from atom to atom.  

```Plain
Si Si p Si Si Si Si Si Si Si p
p Si Si Si Si p Si Si Si Si Si
Si Si Si p Si Si Si Si p Si Si
Si p Si Si p Si Si Si Si Si Si
Si Si Si Si Si Si p Si Si p Si
Si p Si Si Si Si Si Si p Si Si
```

#### P-Type

Some Aluminum is added to the Silicon. `Al` is missing one electron, so it can't provide its 4 neighbors with an electron to share.

```Plain
Si Si Al Si Si Si Si Si Si Si Al
Al Si Si Si Si Al Si Si Si Si Si
Si Si Si Al Si Si Si Si Al Si Si
Si Al Si Si Al Si Si Si Si Si Si
Si Si Si Si Si Si Al Si Si Al Si
Si Al Si Si Si Si Si Si Al Si Si
```

### Combining both Types

When an N-Type is combined with a P-Type, some electrons from the N-Type side will move over to the P-Type side and occupy the missing electrons there. This creates a barrier between both types, creating an electric field that prevents more electrons from switching sides.

#### Forward Bias

If energy is provided to the Cathode, the electrons flow, as the voltage is superior to the barrier's.

```Plain
(-)-----[P|N]-----(+)
```

#### Reverse Bias

If energy is provided to the Anode, the electrons can't flow, as the barrier expands.

```Plain
(-)--[P]      [N]--(+)
```
