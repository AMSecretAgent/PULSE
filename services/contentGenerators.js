import { C, GRADS } from '../constants/colors';
import { ZODIAC_IMAGES, RECIPE_IMAGES, HEALTH_IMAGES } from '../constants/images';

export function generateSpecialContent(category) {
  switch (category) {
    case 'horoscope':          return generateHoroscopeCards();
    case 'study':              return generateStudyCards();
    case 'recipes':            return generateRecipeCards();
    case 'healthy_lifestyle':  return generateHealthCards();
    case 'success_stories':    return generateSuccessCards();
    case 'puzzles':            return generatePuzzleCards();
    default: return [];
  }
}

export function generateHoroscopeCards() {
  const signs = [
    { name: 'Aries',       emoji: '♈', dates: 'Mar 21 – Apr 19', element: 'Fire',  color: '#ff4d6d' },
    { name: 'Taurus',      emoji: '♉', dates: 'Apr 20 – May 20', element: 'Earth', color: '#00e5b0' },
    { name: 'Gemini',      emoji: '♊', dates: 'May 21 – Jun 20', element: 'Air',   color: '#f5a623' },
    { name: 'Cancer',      emoji: '♋', dates: 'Jun 21 – Jul 22', element: 'Water', color: '#5eadf5' },
    { name: 'Leo',         emoji: '♌', dates: 'Jul 23 – Aug 22', element: 'Fire',  color: '#f5a623' },
    { name: 'Virgo',       emoji: '♍', dates: 'Aug 23 – Sep 22', element: 'Earth', color: '#00e5b0' },
    { name: 'Libra',       emoji: '♎', dates: 'Sep 23 – Oct 22', element: 'Air',   color: '#a855f7' },
    { name: 'Scorpio',     emoji: '♏', dates: 'Oct 23 – Nov 21', element: 'Water', color: '#ff4d6d' },
    { name: 'Sagittarius', emoji: '♐', dates: 'Nov 22 – Dec 21', element: 'Fire',  color: '#5b4fe8' },
    { name: 'Capricorn',   emoji: '♑', dates: 'Dec 22 – Jan 19', element: 'Earth', color: '#5eadf5' },
    { name: 'Aquarius',    emoji: '♒', dates: 'Jan 20 – Feb 18', element: 'Air',   color: '#00e5b0' },
    { name: 'Pisces',      emoji: '♓', dates: 'Feb 19 – Mar 20', element: 'Water', color: '#a855f7' },
  ];
  return signs.map((s, i) => ({
    id: `horoscope-${s.name}`,
    type: 'horoscope',
    cat: 'HOROSCOPE',
    cc: s.color,
    gradStart: GRADS[i % 5][0],
    gradEnd: GRADS[i % 5][1],
    hl: `${s.emoji} ${s.name}`,
    sm: `${s.dates} · ${s.element} Sign`,
    src: 'Daily Horoscope',
    tm: 'Today',
    image: ZODIAC_IMAGES[i],
    tags: [s.name, s.element, 'Horoscope', 'Today'],
    gi: i % 5,
    score: 90 + Math.floor(Math.random() * 9),
    zodiacData: s,
    publishedAt: new Date().toISOString(),
  }));
}

export function generateStudyCards() {
  const items = [
    { hl: '5 Proven Memory Techniques for Exam Success', sm: 'Spaced repetition, active recall, and mind mapping can triple your retention rates within weeks.', tags: ['Memory', 'Exams', 'Study'] },
    { hl: 'The Pomodoro Technique: Study Smarter in 25-Minute Bursts', sm: 'Break study sessions into focused intervals separated by short breaks to maximize concentration and reduce burnout.', tags: ['Pomodoro', 'Focus', 'Productivity'] },
    { hl: 'How Toppers Crack Competitive Exams on First Attempt', sm: 'Insights from IAS, UPSC, and CAT toppers on their daily routines, study materials and mindset.', tags: ['Toppers', 'Strategy', 'UPSC'] },
    { hl: 'Active Recall vs. Re-Reading: Which Actually Works?', sm: 'Science-backed research shows active recall outperforms passive re-reading by a factor of 3 for long-term retention.', tags: ['Research', 'Recall', 'Learning'] },
    { hl: 'Building a Study Schedule That You Will Actually Follow', sm: 'Practical tips for time blocking, priority setting, and building habits that stick even during stressful periods.', tags: ['Schedule', 'Habits', 'Planning'] },
    { hl: 'Digital Detox During Exams: The Ultimate Study Hack', sm: 'How removing phone distractions for just 2 hours a day can increase your study output by over 40%.', tags: ['Focus', 'Digital', 'Detox'] },
    { hl: 'Cornell Note-Taking System: The Secret of Ivy League Students', sm: 'A structured note-taking method that organises information for review, boosting comprehension and recall significantly.', tags: ['Notes', 'Cornell', 'Learning'] },
    { hl: 'Understanding Over Memorisation: The Concept-First Approach', sm: 'Why building conceptual frameworks before drilling facts leads to deeper understanding and better performance.', tags: ['Concepts', 'Understanding', 'Learning'] },
  ];
  const colors = [C.cyan, C.indigo, C.gold, C.violet, '#5eadf5', C.rose, C.cyan, C.gold];
  return items.map((item, i) => ({
    id: `study-${i}`,
    type: 'study',
    cat: 'STUDY',
    cc: colors[i % colors.length],
    gradStart: GRADS[i % 5][0],
    gradEnd: GRADS[i % 5][1],
    hl: item.hl,
    sm: item.sm,
    src: 'Study Hub',
    tm: 'Today',
    image: null,
    tags: item.tags,
    gi: i % 5,
    score: 88 + Math.floor(Math.random() * 10),
    studyContent: generateStudyDetail(item),
    publishedAt: new Date().toISOString(),
  }));
}

function generateStudyDetail(item) {
  return {
    title: item.hl,
    intro: item.sm,
    sections: [
      { heading: 'Why This Matters', body: 'Understanding effective study techniques is the difference between spending 10 hours and 4 hours achieving the same outcome. Research in cognitive psychology consistently shows that most students study ineffectively—not because they lack dedication, but because they use methods that feel productive but deliver poor results.' },
      { heading: 'The Core Principle', body: 'The brain encodes information through repeated, spaced exposure combined with active retrieval. Passive methods like re-reading and highlighting create an illusion of familiarity without building actual memory pathways. Active methods force your brain to work, strengthening neural connections.' },
      { heading: 'Step-by-Step Guide', body: '1. Start with a 5-minute preview of the material\n2. Set a timer for 25 minutes of focused study (no phone)\n3. After reading a section, close the book and write everything you remember\n4. Review your notes and fill in gaps\n5. Take a 5-minute break\n6. Repeat. After 4 cycles, take a 30-minute break.' },
      { heading: 'Common Mistakes to Avoid', body: 'Do not study the same subject for more than 2 hours in one stretch. Do not rely on re-reading alone. Do not study lying down or in a dimly lit room. Do not skip breaks thinking you will retain more.' },
      { heading: 'Pro Tip', body: 'Teach what you have learned to someone else, or explain it out loud to yourself. The "Feynman Technique" of teaching concepts in simple language is one of the most reliable indicators of genuine understanding.' },
    ],
    keyTakeaways: ["Space your study sessions across multiple days", "Test yourself, don't just re-read", 'Take regular breaks to consolidate memory', 'Prioritize understanding over rote memorisation'],
  };
}

export function generateRecipeCards() {
  const recipes = [
    { hl: 'Creamy Butter Chicken (Murgh Makhani)', sm: 'Rich, velvety tomato-based curry with tender chicken and aromatic spices. Restaurant quality at home.', tags: ['Indian', 'Chicken', 'Curry'], emoji: '🍛', cookTime: '45 min', difficulty: 'Medium', color: '#f5a623' },
    { hl: 'Classic Masala Chai from Scratch', sm: 'Perfectly spiced Indian tea with fresh ginger, cardamom, cinnamon and black pepper. The original recipe.', tags: ['Drink', 'Tea', 'Chai'], emoji: '☕', cookTime: '15 min', difficulty: 'Easy', color: C.gold },
    { hl: 'Fluffy Banana Pancakes (3 Ingredients)', sm: 'Naturally sweet, gluten-free pancakes made with just banana, eggs and a pinch of salt. Ready in 10 minutes.', tags: ['Breakfast', 'Healthy', 'Quick'], emoji: '🥞', cookTime: '10 min', difficulty: 'Easy', color: C.cyan },
    { hl: 'One-Pot Rajma Masala', sm: 'Hearty kidney bean curry slow-cooked with tomatoes, onions and a blend of whole spices. Perfect with rice.', tags: ['Vegetarian', 'Protein', 'Indian'], emoji: '🫘', cookTime: '40 min', difficulty: 'Easy', color: '#ff4d6d' },
    { hl: 'Avocado Toast with Poached Egg', sm: 'Creamy smashed avocado on toasted sourdough, topped with a perfectly poached egg and chilli flakes.', tags: ['Breakfast', 'Healthy', 'Quick'], emoji: '🥑', cookTime: '12 min', difficulty: 'Easy', color: C.cyan },
    { hl: 'Homemade Biryani (Hyderabadi Style)', sm: 'Aromatic basmati rice layered with spiced meat, saffron and caramelised onions. A royal feast at home.', tags: ['Biryani', 'Indian', 'Rice'], emoji: '🍚', cookTime: '90 min', difficulty: 'Hard', color: C.gold },
    { hl: 'Chocolate Lava Cake in 20 Minutes', sm: 'Individual chocolate cakes with a warm, gooey molten centre. Impressive, easy, and absolutely irresistible.', tags: ['Dessert', 'Chocolate', 'Quick'], emoji: '🎂', cookTime: '20 min', difficulty: 'Medium', color: C.violet },
    { hl: 'Homemade Hummus with Roasted Garlic', sm: 'Silky smooth chickpea dip with tahini, lemon juice and roasted garlic. Far better than anything store-bought.', tags: ['Dip', 'Healthy', 'Vegan'], emoji: '🥙', cookTime: '20 min', difficulty: 'Easy', color: '#5eadf5' },
  ];
  return recipes.map((r, i) => ({
    id: `recipe-${i}`,
    type: 'recipe',
    cat: 'RECIPES',
    cc: r.color,
    gradStart: GRADS[i % 5][0],
    gradEnd: GRADS[i % 5][1],
    hl: r.hl,
    sm: r.sm,
    src: 'Recipe Hub',
    tm: r.cookTime,
    image: RECIPE_IMAGES[i] || null,
    tags: r.tags,
    gi: i % 5,
    score: 95,
    recipeData: getRecipeDetail(r, i),
    emoji: r.emoji,
    cookTime: r.cookTime,
    difficulty: r.difficulty,
    publishedAt: new Date().toISOString(),
  }));
}

function getRecipeDetail(r, i) {
  const allRecipes = {
    0: {
      servings: 4,
      ingredients: ['700g chicken thighs', '2 tbsp butter', '1 cup heavy cream', '1 cup tomato puree', '1 large onion, diced', '4 garlic cloves, minced', '1 inch ginger, grated', '2 tsp garam masala', '1 tsp turmeric', '1 tsp chilli powder', '1 tsp cumin', 'Salt to taste', 'Fresh coriander to garnish'],
      steps: [
        { num: 1, title: 'Marinate chicken', instruction: 'Mix chicken with yogurt, turmeric, chilli powder and garam masala. Marinate for at least 30 minutes or overnight.' },
        { num: 2, title: 'Cook the chicken', instruction: 'Heat butter in a pan over medium-high heat. Cook chicken pieces until golden and slightly charred on edges. Set aside.' },
        { num: 3, title: 'Make the sauce', instruction: 'In the same pan, sauté onions until golden. Add garlic and ginger, cook 2 minutes. Add tomato puree and spices. Simmer 10 minutes.' },
        { num: 4, title: 'Add cream', instruction: 'Blend the sauce smooth. Return to pan, add cream and butter. Simmer on low for 5 minutes until rich and velvety.' },
        { num: 5, title: 'Combine and serve', instruction: 'Add cooked chicken to the sauce. Simmer 5 more minutes. Garnish with fresh coriander. Serve with naan or rice.' },
      ],
      tips: 'For authentic flavour, use kasuri methi (dried fenugreek leaves) in the final step. Also, the longer you marinate the chicken, the more tender it becomes.',
    },
    default: {
      servings: 2,
      ingredients: ['Main ingredient 1', 'Main ingredient 2', 'Spice 1', 'Spice 2', 'Oil or butter', 'Salt and pepper', 'Fresh herbs'],
      steps: [
        { num: 1, title: 'Prep ingredients', instruction: 'Wash, chop and measure all ingredients before you begin. Good prep makes cooking smooth and enjoyable.' },
        { num: 2, title: 'Heat pan', instruction: 'Heat a pan over medium heat and add oil. Wait until oil shimmers before adding ingredients.' },
        { num: 3, title: 'Cook main components', instruction: 'Cook the main ingredients, stirring occasionally until done. Season with salt and spices as you go.' },
        { num: 4, title: 'Finish and plate', instruction: 'Adjust seasoning, add fresh herbs and plate beautifully. Serve immediately for best results.' },
      ],
      tips: 'Always taste as you cook and adjust seasoning gradually. It is much easier to add seasoning than to remove it.',
    },
  };
  return { ...(allRecipes[i] || allRecipes.default), name: r.hl, emoji: r.emoji, cookTime: r.cookTime, difficulty: r.difficulty };
}

export function generateHealthCards() {
  const items = [
    { hl: '7-Minute Morning Yoga Routine for Beginners', sm: 'A gentle sequence of 8 poses to energise your body, release tension and improve flexibility before breakfast.', tags: ['Yoga', 'Morning', 'Beginner'], type: 'yoga', emoji: '🧘' },
    { hl: '10,000 Steps: The Science Behind the Daily Walk Goal', sm: 'Why daily walking is one of the most effective habits for cardiovascular health, mental clarity and longevity.', tags: ['Walking', 'Cardio', 'Habit'], type: 'walking', emoji: '🚶' },
    { hl: 'The 5-Minute Breathing Exercise That Reduces Anxiety', sm: 'Box breathing technique used by Navy SEALs to instantly calm the nervous system and sharpen focus.', tags: ['Breathing', 'Anxiety', 'Calm'], type: 'breathing', emoji: '🌬️' },
    { hl: "Intermittent Fasting: A Beginner's Complete Guide", sm: 'Everything you need to know about the 16:8 method, its benefits for weight management and metabolic health.', tags: ['Fasting', 'Diet', 'Wellness'], type: 'nutrition', emoji: '🥗' },
    { hl: 'Fix Your Posture with These 5 Desk Stretches', sm: 'Simple exercises you can do at your desk to counteract hours of sitting and prevent back and neck pain.', tags: ['Posture', 'Office', 'Stretches'], type: 'exercise', emoji: '💪' },
    { hl: 'Sleep Hygiene: 8 Habits for Deep, Restful Sleep', sm: 'Science-backed strategies to fall asleep faster, sleep deeper and wake up feeling genuinely refreshed.', tags: ['Sleep', 'Rest', 'Recovery'], type: 'sleep', emoji: '😴' },
    { hl: 'Mindful Eating: How to Transform Your Relationship with Food', sm: 'Slow down, savor, and develop a healthier, more conscious approach to mealtimes and nutrition.', tags: ['Mindful', 'Eating', 'Nutrition'], type: 'nutrition', emoji: '🍎' },
    { hl: 'Cold Shower Benefits: What 30 Days Taught Me', sm: 'The science and personal experience of taking cold showers daily—metabolism, mood, discipline and beyond.', tags: ['Cold', 'Shower', 'Challenge'], type: 'wellness', emoji: '🚿' },
  ];
  const colors = [C.cyan, '#00e5b0', C.indigo, C.gold, '#5eadf5', C.violet, C.cyan, C.rose];
  return items.map((item, i) => ({
    id: `health-${i}`,
    type: 'healthy_lifestyle',
    cat: 'HEALTHY LIFESTYLE',
    cc: colors[i % colors.length],
    gradStart: GRADS[i % 5][0],
    gradEnd: GRADS[i % 5][1],
    hl: item.hl,
    sm: item.sm,
    src: 'Wellness Hub',
    tm: 'Today',
    image: HEALTH_IMAGES[i] || null,
    tags: item.tags,
    gi: i % 5,
    score: 92 + Math.floor(Math.random() * 7),
    healthData: getHealthDetail(item, i),
    emoji: item.emoji,
    publishedAt: new Date().toISOString(),
  }));
}

function getHealthDetail(item) {
  return {
    title: item.hl,
    intro: item.sm,
    emoji: item.emoji,
    sections: [
      { heading: 'Overview', body: `${item.sm} This guide will walk you through everything you need to know to get started safely and effectively.` },
      { heading: 'Key Benefits', body: '• Improved physical and mental wellbeing\n• Increased energy levels throughout the day\n• Better stress management and resilience\n• Enhanced sleep quality and recovery\n• Long-term disease prevention' },
      { heading: 'Getting Started', body: 'Begin gradually and listen to your body. Consistency matters far more than intensity. Start with 5-10 minutes daily and build up over time. The goal is to make this a sustainable habit, not a short-term challenge.' },
      { heading: 'Step-by-Step Guide', body: '1. Set a specific time each day for this practice\n2. Prepare your environment in advance\n3. Start with the basic version before advancing\n4. Track your progress in a journal or app\n5. Rest when needed—recovery is part of the process' },
      { heading: 'Safety Precautions', body: 'Always warm up before exercise. Stop if you feel sharp pain (not to be confused with normal muscle fatigue). Stay hydrated. Consult a doctor if you have any pre-existing conditions before starting a new health routine.' },
      { heading: 'Pro Tips', body: 'Pair this habit with an existing one for better adherence (habit stacking). For example, do your breathing exercises right after brushing teeth. Accountability partners or apps significantly increase success rates.' },
    ],
    keyPoints: ['Start small and build consistency', 'Listen to your body always', 'Pair with other healthy habits', 'Track progress to stay motivated'],
  };
}

export function generateSuccessCards() {
  const stories = [
    { hl: 'From Street Vendor to $1B Startup: The Ritesh Agarwal Story', sm: "OYO founder Ritesh Agarwal dropped out of college at 17 and built a hotel empire that spans 35 countries.", person: 'Ritesh Agarwal', role: 'Founder, OYO Rooms', tags: ['Startup', 'OYO', 'Entrepreneurship'], color: C.cyan },
    { hl: 'How Kiran Mazumdar-Shaw Built Biocon from a Garage', sm: "Rejected by every bank, she started Biocon in 1978 with Rs 10,000. Today it is India's largest biopharma company.", person: 'Kiran Mazumdar-Shaw', role: 'Founder & CMD, Biocon', tags: ['Biotech', 'Women', 'Pioneer'], color: C.gold },
    { hl: 'Dhirubhai Ambani: The Man Who Democratised the Stock Market', sm: 'Starting as a petrol station attendant in Yemen, he returned to India to build the Reliance empire from scratch.', person: 'Dhirubhai Ambani', role: 'Founder, Reliance Industries', tags: ['Reliance', 'Business', 'Legacy'], color: '#ff4d6d' },
    { hl: 'Sundar Pichai: The Chennai Boy Who Leads Google', sm: "Grew up without a refrigerator or car, sharing one room with his family. Today he runs one of the world's most valuable companies.", person: 'Sundar Pichai', role: 'CEO, Google & Alphabet', tags: ['Google', 'Tech', 'India'], color: C.indigo },
    { hl: "Mary Kom: Six World Championships from Manipur's Poverty", sm: 'Fighting gender prejudice, poverty and self-doubt to become the world\'s most decorated amateur female boxer.', person: 'Mary Kom', role: '6x World Boxing Champion', tags: ['Boxing', 'Sports', 'Women'], color: C.rose },
    { hl: 'IAS Officer Who Failed UPSC 4 Times Before Cracking Rank 1', sm: "Kanishak Kataria's journey from repeated failure to AIR 1 in UPSC 2018—a story of resilience and smart strategy.", person: 'Kanishak Kataria', role: 'IAS, UPSC 2018 AIR 1', tags: ['UPSC', 'IAS', 'Inspiration'], color: C.violet },
    { hl: "Falguni Nayar: India's Richest Self-Made Woman", sm: 'Left a high-paying banking job at 49 to start Nykaa. Now a billionaire who proved age is no barrier to entrepreneurship.', person: 'Falguni Nayar', role: 'Founder & CEO, Nykaa', tags: ['Nykaa', 'Women', 'Startup'], color: '#5eadf5' },
    { hl: 'Elon Musk: From Being Bullied to Owning the Future', sm: "Beaten up as a child, bankrupt twice, yet he persisted to become the world's most ambitious entrepreneur.", person: 'Elon Musk', role: 'CEO, Tesla & SpaceX', tags: ['Tesla', 'SpaceX', 'Vision'], color: C.gold },
  ];
  return stories.map((s, i) => ({
    id: `success-${i}`,
    type: 'success_stories',
    cat: 'SUCCESS STORIES',
    cc: s.color,
    gradStart: GRADS[i % 5][0],
    gradEnd: GRADS[i % 5][1],
    hl: s.hl,
    sm: s.sm,
    src: s.person,
    tm: s.role,
    image: null,
    tags: s.tags,
    gi: i % 5,
    score: 97,
    storyData: getSuccessDetail(s),
    publishedAt: new Date().toISOString(),
  }));
}

function getSuccessDetail(s) {
  return {
    title: s.hl,
    person: s.person,
    role: s.role,
    intro: s.sm,
    journey: [
      { phase: 'The Beginning',      text: `${s.person} started with very little. Born into circumstances that would make most people give up, the early years were marked by struggle, rejection and self-doubt. But it was precisely this adversity that forged the character traits that would later define extraordinary success.` },
      { phase: 'The Turning Point',  text: `A single moment, decision or mentor can change the trajectory of a life. For ${s.person}, this came unexpectedly—an opportunity that others overlooked, a problem that needed solving, or simply a refusal to accept the status quo. The turning point was not dramatic at the time. It rarely is.` },
      { phase: 'The Grind',          text: `Success is never linear. There were years of invisible progress—working 16-hour days with no recognition, watching others advance while struggling to keep going. The temptation to quit was real and recurring. What set ${s.person} apart was not talent alone, but the willingness to stay in the arena.` },
      { phase: 'The Breakthrough',   text: `When it finally came, the breakthrough seemed sudden to the outside world. But those who lived through it knew it was the inevitable result of years of preparation meeting a moment of opportunity. ${s.person}'s story proves that timing matters, but readiness matters more.` },
      { phase: 'The Legacy',         text: `Today, ${s.person}'s impact extends far beyond personal achievement. Thousands of people have been inspired, employed or uplifted by the work. The legacy is not just the company or titles—it is the proof that someone like you, from wherever you are, can do something remarkable.` },
    ],
    lessons: [
      'Failure is data, not a verdict',
      'Consistency beats talent in the long run',
      'Your background does not define your ceiling',
      'Find your obsession and make it your profession',
      'Build resilience before you need it',
    ],
    quote: `"The harder I work, the luckier I get." — ${s.person}`,
  };
}

export function generatePuzzleCards() {
  return [
    { id: 'puzzle-sudoku', type: 'puzzle', subtype: 'sudoku', cat: 'PUZZLES', cc: C.indigo, hl: 'Daily Sudoku Challenge',        sm: "Test your logic with today's number puzzle. Three difficulty levels available.",       tags: ['Sudoku', 'Logic', 'Numbers'], emoji: '🔢', gradStart: GRADS[0][0], gradEnd: GRADS[0][1], gi: 0, score: 98, src: 'Puzzle Hub', tm: 'Daily', image: null, publishedAt: new Date().toISOString() },
    { id: 'puzzle-word',   type: 'puzzle', subtype: 'word',   cat: 'PUZZLES', cc: C.cyan,   hl: 'Word Search: Technology Edition', sm: 'Find 10 hidden tech words in a 10×10 grid. Race against time!',                        tags: ['Word', 'Search', 'Tech'],     emoji: '🔤', gradStart: GRADS[1][0], gradEnd: GRADS[1][1], gi: 1, score: 96, src: 'Puzzle Hub', tm: 'Daily', image: null, publishedAt: new Date().toISOString() },
    { id: 'puzzle-vocab',  type: 'puzzle', subtype: 'vocab',  cat: 'PUZZLES', cc: C.gold,   hl: 'Vocabulary Challenge: 10 Words',  sm: 'Do you know these 10 advanced English words? Test yourself and build your vocabulary.', tags: ['Vocabulary', 'English', 'Words'], emoji: '📚', gradStart: GRADS[2][0], gradEnd: GRADS[2][1], gi: 2, score: 94, src: 'Puzzle Hub', tm: 'Daily', image: null, publishedAt: new Date().toISOString() },
    { id: 'puzzle-brain',  type: 'puzzle', subtype: 'brain',  cat: 'PUZZLES', cc: C.rose,   hl: 'Brain Teasers: 5 Mind-Bending Riddles', sm: 'Logic puzzles that will make you think differently. Can you solve all five?',       tags: ['Riddles', 'Logic', 'Brain'],  emoji: '🧠', gradStart: GRADS[3][0], gradEnd: GRADS[3][1], gi: 3, score: 97, src: 'Puzzle Hub', tm: 'Daily', image: null, publishedAt: new Date().toISOString() },
    { id: 'puzzle-math',   type: 'puzzle', subtype: 'math',   cat: 'PUZZLES', cc: C.violet, hl: 'Mental Math Sprint: 60 Seconds',   sm: 'How many arithmetic problems can you solve in 60 seconds? Challenge your mental speed!', tags: ['Math', 'Speed', 'Numbers'],   emoji: '➗', gradStart: GRADS[4][0], gradEnd: GRADS[4][1], gi: 4, score: 95, src: 'Puzzle Hub', tm: 'Daily', image: null, publishedAt: new Date().toISOString() },
  ];
}