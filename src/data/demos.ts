export interface DemoQuestion {
  id: string;
  text: string;
  answer: string;
}

export interface DemoVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  tags: string[];
  questions: DemoQuestion[];
}

export const demos: DemoVideo[] = [
  {
    id: "cooking-pasta",
    title: "Cooking Pasta",
    description: "A chef prepares fresh pasta from scratch in a restaurant kitchen.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=480&q=80",
    tags: ["cooking", "indoor"],
    questions: [
      {
        id: "cp-q1",
        text: "Describe the main actions in this video",
        answer:
          "The video shows a chef in a professional kitchen preparing fresh pasta. The process begins with mixing flour and eggs on a large wooden surface, then kneading the dough until it reaches a smooth, elastic consistency. The chef uses a pasta machine to roll the dough into thin sheets, carefully adjusting the thickness setting with each pass. Finally, the sheets are cut into fettuccine-width strips and dusted with flour to prevent sticking. The entire process demonstrates skilled hand movements and precise timing typical of professional pasta preparation.",
      },
      {
        id: "cp-q2",
        text: "What equipment is being used?",
        answer:
          "Several pieces of kitchen equipment are visible throughout the video:\n\n1. **Large wooden cutting board** — used as the primary work surface for kneading\n2. **Pasta roller machine** — a hand-cranked stainless steel device used to thin the dough progressively\n3. **Bench scraper** — used to portion the dough and clean the work surface\n4. **Mixing bowl** — stainless steel, used for the initial flour-egg mixture\n5. **Flour sifter** — used to dust the work surface and finished pasta\n\nThe kitchen also features commercial-grade stainless steel countertops and a visible gas range in the background.",
      },
      {
        id: "cp-q3",
        text: "How many people appear in the scene?",
        answer:
          "Two people are visible in the video. The primary subject is the chef who is actively preparing the pasta — they are centered in frame and wearing a white chef's coat. A second person can be briefly seen in the background around the 0:15 mark, appearing to work at an adjacent station. They are partially obscured and appear to be performing prep work independently.",
      },
      {
        id: "cp-q4",
        text: "What is the approximate duration of each step?",
        answer:
          "Based on the video timeline, the pasta preparation follows this approximate schedule:\n\n- **0:00–0:08** — Measuring and combining flour and eggs (~8 seconds)\n- **0:08–0:18** — Initial mixing and incorporation (~10 seconds)\n- **0:18–0:35** — Kneading the dough to proper consistency (~17 seconds)\n- **0:35–0:48** — Resting and portioning the dough (~13 seconds)\n- **0:48–1:05** — Rolling through the pasta machine (~17 seconds)\n- **1:05–1:15** — Cutting and finishing (~10 seconds)\n\nThe total visible process takes approximately 1 minute and 15 seconds, though real pasta preparation would involve a 30-minute rest period between kneading and rolling.",
      },
    ],
  },
  {
    id: "street-traffic",
    title: "Urban Street Traffic",
    description: "Busy city intersection with vehicles and pedestrians during rush hour.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?w=480&q=80",
    tags: ["urban", "outdoor", "traffic"],
    questions: [
      {
        id: "st-q1",
        text: "Summarize what is happening in this video",
        answer:
          "The video captures a busy urban intersection during what appears to be evening rush hour. Multiple lanes of traffic flow through a signalized intersection, with a mix of passenger cars, taxis, buses, and delivery trucks. Pedestrians cross at marked crosswalks during signal phases, with some jaywalking visible between traffic gaps. Traffic signal changes create alternating waves of vehicle and pedestrian movement. The overall scene conveys the organized chaos typical of a major city's peak commuting period.",
      },
      {
        id: "st-q2",
        text: "Count the types of vehicles visible",
        answer:
          "The following vehicle types are observed in the video:\n\n| Vehicle Type | Approximate Count |\n|---|---|\n| Sedans / passenger cars | 12–15 |\n| SUVs | 4–5 |\n| Taxis (yellow) | 3 |\n| City buses | 2 |\n| Delivery vans | 2 |\n| Motorcycles / scooters | 1 |\n| Bicycles | 2 |\n\n**Total: approximately 26–30 vehicles** pass through the intersection during the clip. The dominant vehicle type is passenger sedans, making up roughly half of all traffic.",
      },
      {
        id: "st-q3",
        text: "Are there any potential safety concerns?",
        answer:
          "Several potential safety concerns are visible in the video:\n\n1. **Jaywalking pedestrians** — At least two pedestrians cross outside the marked crosswalk area between the 0:05 and 0:12 marks, moving between slow-moving vehicles.\n2. **Close following distance** — Several vehicles in the rightmost lane are following very closely (less than one car length) at speeds around 20–30 km/h.\n3. **Late yellow-light entry** — One vehicle enters the intersection just as the signal transitions from yellow to red (around 0:22).\n4. **Cyclist without dedicated lane** — A cyclist is sharing the rightmost vehicle lane without visible bike lane markings, positioned in a potential blind spot for turning vehicles.\n\nNo actual collisions or near-misses are observed, but these patterns represent common urban traffic risks.",
      },
    ],
  },
  {
    id: "nature-wildlife",
    title: "Wildlife at Sunset",
    description: "A group of deer grazing near a forest clearing during golden hour.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1484406566174-437a054e2786?w=480&q=80",
    tags: ["nature", "wildlife", "outdoor"],
    questions: [
      {
        id: "nw-q1",
        text: "Describe the scene and environment",
        answer:
          "The video shows a serene forest clearing during golden hour, approximately 30–45 minutes before sunset based on the light angle and warm color temperature. A group of deer — likely white-tailed deer based on their body shape and markings — are grazing on the edge of a meadow that borders a mixed deciduous-coniferous forest. The grass in the clearing is approximately 15–20cm tall and shows signs of regular grazing. Warm, directional sunlight creates long shadows and a golden rim-light effect on the deer's fur. The background forest canopy is dense with a mix of oak and pine trees, with some early autumn color visible in the understory.",
      },
      {
        id: "nw-q2",
        text: "How many animals are present and what are they doing?",
        answer:
          "There are **5 deer** visible in the video:\n\n1. **Adult doe (center)** — Actively grazing, head lowered to the grass for most of the clip\n2. **Adult doe (left)** — Alternating between grazing and scanning the environment with head raised\n3. **Young buck (right)** — Standing at the forest edge with small antler nubs visible, mostly observing\n4. **Fawn (near center doe)** — Staying close to the presumed mother, briefly nursing at 0:08 before beginning to graze independently\n5. **Adult doe (background)** — Partially obscured by vegetation, slowly moving toward the group\n\nThe group exhibits typical relaxed grazing behavior with periodic vigilance scans, suggesting they feel relatively secure in this location.",
      },
      {
        id: "nw-q3",
        text: "What time of day is this filmed?",
        answer:
          "Based on multiple visual cues, this was filmed during **late afternoon / golden hour**, approximately 45–60 minutes before sunset:\n\n- **Light direction**: Strong directional side-lighting from the left (west), creating elongated shadows extending to the right\n- **Color temperature**: Warm amber/golden tones (estimated 3000–3500K), characteristic of low sun angle\n- **Shadow length**: Shadows are roughly 3–4x the height of the deer, indicating a sun elevation of approximately 15–20 degrees\n- **Sky visible through canopy**: Warm orange gradients visible in small patches of sky between trees\n\nThe season appears to be **early autumn** based on the partial leaf color change and the grass condition.",
      },
    ],
  },
  {
    id: "sports-basketball",
    title: "Basketball Practice",
    description: "Players running drills and shooting practice in an indoor gymnasium.",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=480&q=80",
    tags: ["sports", "indoor", "action"],
    questions: [
      {
        id: "sb-q1",
        text: "What activities are shown in this video?",
        answer:
          "The video captures a basketball practice session in an indoor gymnasium. The following activities are shown in sequence:\n\n1. **Warm-up layup lines** (0:00–0:12) — Players form two lines and alternate driving to the basket for layups, with one line providing passes\n2. **Three-point shooting drill** (0:12–0:25) — Players rotate through five spots along the three-point arc, taking catch-and-shoot attempts\n3. **One-on-one defensive drill** (0:25–0:38) — Pairs of players practice isolation moves with an emphasis on defensive positioning\n4. **Free throw practice** (0:38–0:48) — Players line up at the foul line for consecutive free throw attempts\n\nA coach is visible throughout, providing verbal instruction and occasionally demonstrating proper technique.",
      },
      {
        id: "sb-q2",
        text: "How many players are on the court?",
        answer:
          "There are **8 players** actively participating on the court, plus **1 coach**. The players are wearing two different colored practice jerseys — 4 in blue and 4 in white — which are used to organize the drill rotations. Additionally, **2 players** can be seen sitting on the bench along the sideline, appearing to rest between rotations. This brings the total team count to **10 players** and **1 coaching staff** member visible in the video.",
      },
      {
        id: "sb-q3",
        text: "Analyze the shooting technique shown",
        answer:
          "The shooting technique displayed varies across players, but several common patterns are observable:\n\n**Strong fundamentals (players #7 and #12):**\n- Proper BEEF form (Balance, Eyes, Elbow, Follow-through)\n- Feet shoulder-width apart, slightly staggered with shooting foot forward\n- Smooth one-motion release with high arc\n- Consistent follow-through held until the ball reaches the rim\n\n**Areas for improvement (other players):**\n- Some players show a noticeable hitch or two-motion shot, pausing at the set point\n- A few exhibit inconsistent foot placement on catch-and-shoot attempts\n- One player (#23) tends to fade away slightly on three-point attempts, reducing accuracy\n\nThe overall shooting percentage during the visible drill appears to be approximately 40–50% from three-point range, which is reasonable for a practice setting.",
      },
      {
        id: "sb-q4",
        text: "Describe the facility and court markings",
        answer:
          "The practice takes place in a **regulation-size indoor gymnasium** with the following characteristics:\n\n- **Court**: Full-size hardwood basketball court with standard NCAA markings, including three-point arc, free-throw lane, half-court line, and center circle\n- **Floor**: Maple hardwood with a medium-gloss finish, team logo visible at center court\n- **Backboards**: Glass backboards with breakaway rims on adjustable stanchions at both ends\n- **Lighting**: Overhead fluorescent/LED panel lighting providing even illumination across the court\n- **Seating**: Retractable bleacher seating along both sidelines, currently folded against the walls\n- **Scoreboard**: Digital scoreboard visible on the far wall, currently inactive\n- **Ceiling height**: Estimated 25–30 feet, sufficient for high-arc shots without interference\n\nThe facility appears to be a college-level practice gym based on the quality of equipment and court markings.",
      },
    ],
  },
];
