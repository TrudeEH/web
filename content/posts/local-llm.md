---
# Post
draft: false
searchHidden: false
showToc: true # Table of Contents
author: "TrudeEH"
title: "Local LLMs (ChatGPT-like AI)"
date: 2024-05-30T18:44:10+01:00
tags: ["ai", "llm", "linux", "macos"]
description: "Run AI models locally for free"
cover:
    image: "" # image path/url
    alt: "" # alt text
    caption: "" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page
---

## Why run AI locally?

AI models like ChatGPT and Gemini can be very useful, however, they have a few issues:

- Price (Some tiers can be expensive and require a monthly subscription)
- Freedom (You may be limited by the moral beliefs of the company behind it)
- Internet Access
- Privacy (All your requests are sent to the company's servers and can be seen and used by them for any purpose.)
- Ease of access (Sometimes you may encounter shortages or be unable to use AI efficiently with the tools you already have)

Local AI solves most of these issues: Your requests never leave your computer, and so they are private and can be done offline.

Using AI locally does have some issues, like the need for powerful hardware and on weaker hardware, slower response times. Local models also tend to be smaller and may more often repeat themselves.

PS: All the tools shown below are free and open-source.

## The engine: Ollama

The first step is to actually run the model. The easiest way to do this is using `ollama`.

To set it up, follow the [official guide](https://ollama.com/download) for your device.
After this is done, select your model. As an example, I'll be using `llama3:latest`, an open-source model by Meta.

```sh
ollama pull llama3:latest # Download the model
ollama run llama3 # Interact directly with the model. This is NOT recommended.
```

Ollama by itself is already enough for many, but we can do better.

## The middleman: Fabric

You can think of fabric as a layer between ollama, the tools you use, and you.

Instead of having to guess the perfect way to prompt the AI, set up temperature parameters manually, and use the AI's template language, simply select a fabric pattern (or prompt), and it can automate most of the process.

For example, to write an essay, you could prompt the AI as follows:

```txt
Write a 200 words essay about <topic>.
```

The previous request will generally work, but the lack of a good prompt and configuration will likely affect the quality, speed and accuracy of your request.

A better way would be to use fabric as follows:

```sh
echo "<topic>" | fabric -sp write_essay
```

Fabric can do much more than write essays, though. The patterns available can be listed with `fabric -l`. Some examples include: `extract_wisdom`, `create_command` and `summarize`.

You can call fabric from your own apps and scripts, 'pipe' the result of a prompt into another, and create your own patters (there's a pattern for that too!).

To install fabric, follow their [quickstart guide](https://github.com/danielmiessler/fabric?tab=readme-ov-file#quickstart).

## Other tools and UIs

Some other tools I recommend are:

- [SillyTavern](https://sillytavernai.com/) (Advanced WebUI to create AI characters, tweak settings and write stories.)
- [Text Generation Web UI](https://github.com/oobabooga/text-generation-webui) (A simpler UI to manage models and interact with AI. Can also be used as a server.)
- [LLaMaC++](https://github.com/ggerganov/llama.cpp) (Small and optimized LLM runner written in C/C++. Replaces ollama, but it's harder to set up and use.)
