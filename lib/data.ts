import { Story, Chapter, Post, UniverseLore } from "@/types";

export const mainStory: Story = {
  id: "story-001",
  title: "The Drowned Streetlamp",
  slug: "the-drowned-streetlamp",
  description:
    "The Drowned Streetlamp follows Elias, a nameless teenager surviving in a rain-soaked city. When a frightened boy drops a mysterious device near him, Elias is pulled into a hidden world of watchers, secrets, and choices that may finally force the city to notice him.",
  cover_url: null,
  status: "beta",
  word_count: 28000,
  genre: "Urban Noir / Literary Mystery",
  created_at: "2026-01-15T00:00:00Z",
};

export const sampleChapters: Chapter[] = [
  {
    id: "ch-001",
    story_id: "story-001",
    title: "The Reflection",
    slug: "chapter-1",
    content: `The rain had been falling for three days without pause.

Elias stood beneath the awning of a closed pawn shop, watching the street dissolve into streams of neon and water. He had no name anyone used. The city had given him a number once, back when the systems still tried to count people like him. But that was years ago, before he learned that being unseen was the only real protection the streets offered.

He was seventeen, maybe. Maybe sixteen. Birthdays were for people who had walls.

The streetlamp across the road flickered. Not the steady pulse of a dying bulb, but something more deliberate — a rhythm, almost. Elias tilted his head. The lamp's amber glow caught the surface of a puddle, and for a moment, he saw himself reflected there: thin shoulders, dark hair plastered to his forehead, eyes that had learned to look at everything and see nothing.

Then the lamp died completely.

The darkness that followed was absolute, a sudden absence of light that made the rain sound louder. Elias didn't move. He had learned that movement drew attention, and attention was the one thing he could not afford.

A scrape. Metal on wet concrete.

Elias turned his head just enough to see the alley mouth. A boy was running — small, maybe twelve, clutching something dark against his chest. Behind him, nothing. But Elias had learned to trust the silence between sounds, and the silence behind this boy was wrong. It was the silence of something listening.

The boy stumbled at the corner, right where the dead streetlamp cast no light. The dark object slipped from his hands and skittered across the pavement, stopping inches from Elias's worn sneakers.

The boy didn't stop. He didn't look back. He vanished into the rain as if the city had swallowed him whole.

Elias looked down.

The object was a device unlike anything he had seen. Small enough to fit in a palm, matte black with no buttons, no screen, no markings. But as he reached for it, the surface warmed — not from his touch, but from something inside it, something that recognized his presence.

The streetlamp flickered back to life.

And in its amber glow, Elias saw that the rain had stopped falling around him. Every drop hung suspended in the air, frozen, as if the world itself had paused to watch what he would do next.`,
    chapter_number: 1,
    is_premium: false,
    word_count: 420,
    created_at: "2026-01-15T00:00:00Z",
  },
  {
    id: "ch-002",
    story_id: "story-001",
    title: "The Echo",
    slug: "chapter-2",
    content: `The device was warm against his palm, humming with a frequency that seemed to resonate in his bones rather than his ears.

Elias had spent his life avoiding objects that chose their owners. The city was full of them — phones that tracked, cards that traced, systems that catalogued the forgotten and filed them away in databases where they became real enough to be found. But this was different. This device had no brand, no serial number, no indication that it belonged to any system the city recognized.

He turned it over in his hands. The surface was smooth, almost organic, like obsidian that had been worn by centuries of touch. And as he held it, the suspended rain began to fall again — not all at once, but in a wave that started at his feet and rippled outward, as if time itself were resetting around him.

"You're not supposed to have that."

Elias didn't flinch. He had learned that flinching was a language the streets understood. Instead, he turned slowly, keeping the device hidden in his palm.

The speaker was a woman in a gray coat that seemed to absorb the rain rather than repel it. She stood where the alley met the street, her face half-hidden by the collar of her coat. Her eyes were the color of old concrete, and they looked at Elias with an expression that wasn't quite surprise.

"It chose you," she said. It wasn't a question.

"I didn't ask for it."

"No one asks for the Echo. That's the point." She took a step closer, and Elias felt the device grow warmer. "The boy who dropped it — his name is Kel. He's been running for three days. The Ghosts have been watching him since he took it from the Underground."

"Ghosts," Elias repeated. He had heard the word whispered in the margins of the city — in the shelters where people slept in shifts, in the all-night diners where the coffee was always stale and the conversations were always coded. The Ghosts were a story told to keep the forgotten in line. A myth. A warning.

"They're real," the woman said, as if reading his thoughts. "And now they're watching you."

She reached into her coat and withdrew a folded piece of paper. She held it out, and Elias saw that her hands were scarred, the knuckles swollen with old breaks that had never healed properly.

"The Echo shows you what the city hides," she said. "But everything it shows you comes with a price. Kel learned that too late. Don't make the same mistake."

Elias took the paper. It was blank.

"It will make sense when it needs to," she said. Then she turned and walked into the rain, and within three steps, she was gone — not around a corner, not into a doorway, but simply gone, as if the city had folded her back into itself.

Elias looked at the device in his hand. Its surface had changed. Where before it had been blank, now there was a single word glowing in soft amber light:

LISTEN.

And from somewhere deep in the city's bones, Elias heard it — a sound beneath the sound of rain, beneath the hum of neon and the distant rumble of trains. A whisper. A thousand whispers, all speaking at once, all saying the same thing:

We see you now.`,
    chapter_number: 2,
    is_premium: false,
    word_count: 580,
    created_at: "2026-01-20T00:00:00Z",
  },
  {
    id: "ch-003",
    story_id: "story-001",
    title: "The Ghosts",
    slug: "chapter-3",
    content: `[Premium Chapter — Coming Soon]

This chapter continues Elias's journey as the Echo begins to reveal the hidden architecture of the city. The Ghosts close in, and Elias must decide whether to run deeper into the shadows or finally step into the light.

Unlock this chapter to continue reading.`,
    chapter_number: 3,
    is_premium: true,
    word_count: 0,
    created_at: "2026-02-01T00:00:00Z",
  },
];

export const universeLore: UniverseLore[] = [
  {
    id: "lore-001",
    title: "The City",
    slug: "the-city",
    description:
      "A rain-soaked metropolis where neon hides hunger, secrets, and forgotten lives. The city has no name because names are for places that want to be found. It breathes through its subways, speaks through its streetlamps, and remembers everything the people above ground try to forget.",
    icon: "Building2",
    order: 1,
  },
  {
    id: "lore-002",
    title: "The Forgotten",
    slug: "the-forgotten",
    description:
      "People who survive in the margins, unseen by the systems built above them. They are the uncounted, the unregistered, the ones who fall through the gaps in databases and social services. But being forgotten has its own kind of power — the power of invisibility, of existing outside the city's gaze.",
    icon: "Users",
    order: 2,
  },
  {
    id: "lore-003",
    title: "The Ghosts",
    slug: "the-ghosts",
    description:
      "A whispered presence in the city, known for watching, tracking, and appearing where they should not be. No one knows who they serve or what they want. They are not alive in any way the city recognizes, and they are not dead in any way the dead understand. They are something in between — something the city created and then forgot to destroy.",
    icon: "Eye",
    order: 3,
  },
  {
    id: "lore-004",
    title: "The Echo",
    slug: "the-echo",
    description:
      "A mysterious device that becomes the first thread pulling Elias into the city's hidden machinery. It is older than the city, or perhaps the city grew around it. It shows the user what the city hides — but every revelation carries a cost, and the Echo always collects its debts.",
    icon: "Radio",
    order: 4,
  },
  {
    id: "lore-005",
    title: "The Underground",
    slug: "the-underground",
    description:
      "The hidden world beneath the visible city, where information, fear, and survival move quietly. It is not a place but a network — tunnels, forgotten stations, maintenance corridors, and the spaces between walls where the city stores its secrets. The Underground has its own rules, its own economy, and its own kind of justice.",
    icon: "Layers",
    order: 5,
  },
];

export const samplePosts: Post[] = [
  {
    id: "post-001",
    title: "The City Has No Name",
    slug: "the-city-has-no-name",
    content:
      "I've been thinking about why I never named the city. Names give things boundaries. Names make things findable. The city in Streetlight is meant to feel like any city that has forgotten its own people — which is to say, every city.",
    is_premium: false,
    post_type: "note",
    created_at: "2026-01-10T00:00:00Z",
  },
  {
    id: "post-002",
    title: "Early Draft: The Reflection",
    slug: "early-draft-reflection",
    content:
      "[Early draft excerpt from Chapter 1 — Premium content for supporters]",
    is_premium: true,
    post_type: "early_draft",
    created_at: "2026-01-12T00:00:00Z",
  },
];

export const betaReaderNotes = [
  {
    id: 1,
    name: "M. Ochieng",
    note: "The rain in this story isn't just weather. It feels like a character with its own agenda. I've never read a city that breathes like this one.",
    role: "Beta Reader",
  },
  {
    id: 2,
    name: "A. Wanjiku",
    note: "Elias is the kind of protagonist you don't notice at first, and then you realize you've been watching him the whole time. The Echo device is brilliantly understated.",
    role: "Early Reader",
  },
  {
    id: 3,
    name: "J. Kimani",
    note: "The Ghosts terrify me because I can't tell if they're supernatural or just the logical endpoint of surveillance culture. That's the best kind of horror.",
    role: "Beta Reader",
  },
];
