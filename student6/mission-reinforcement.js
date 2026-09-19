/* Student 6 — mission reinforcement layer
   Vocabulary source: student6/vocabulary/preach_my_gospel_complexity_ranked.csv
   Reinforcement pool: Bands 4 and 5 only.
   Each EL_1..EL_10 mission uses 20 Band 4/5 words across six extra,
   collapsed reinforcement activities. */
(function(){
  const specs = [
    {m:EL_1, skill:"Speaking — clear missionary introductions and complete sentences",
     instruction:"Read the skill first. Then build your introduction in short complete sentences. Open the reinforcement cards one at a time; say the target words aloud and use them in the introduction context.",
     words:["companionship","coordination","ministerial","geographic","inhabitants","consultations","attentive","heartfelt","purposeful","familiarity","assurances","characteristic","compatible","endeavor","engage","relevance","tactfully","clarification","observant","congratulations"]},
    {m:EL_2, skill:"Speaking + grammar — giving reasons clearly with because / want to",
     instruction:"Read the skill first. Give a truthful reason, connect it clearly, and avoid invented personal stories. Use the reinforcement cards to expand one short answer into several natural versions.",
     words:["conversion","convictions","consecration","consecrate","heartfelt","purposeful","profound","resilience","fortitude","compassionately","edification","edify","fellowshipping","rejoiced","unshaken","devotionals","bestowed","exalted","tenderness","affirmative"]},
    {m:EL_3, skill:"Pronunciation — final consonants and grammatical word endings",
     instruction:"Read the skill first. Produce the full ending of each word before increasing speed. In every reinforcement card, prioritize a clear final sound over fast speech.",
     words:["accelerates","applications","assessments","convictions","congratulations","consultations","contentions","denominations","manifestations","misunderstandings","necessities","perceptions","prophecies","rejoices","subsections","transgressed","trespasses","promptings","compilations","appendages"]},
    {m:EL_4, skill:"Pronunciation — stress in multisyllabic missionary vocabulary",
     instruction:"Read the skill first. Say each long word slowly, locate the strongest syllable, then repeat it inside a full sentence. Do not sacrifice clarity for speed.",
     words:["authoritative","baptismal","clarification","companionship","conditional","confidential","conversion","coordination","doctrinal","effectiveness","extraordinary","familiarity","interpretation","ministerial","miraculous","preliminary","resurrection","systematic","transformative","comprehension"]},
    {m:EL_5, skill:"Grammar + speaking — accurate present-tense missionary statements",
     instruction:"Read the skill first. Keep the subject and present-tense verb aligned. Use each reinforcement group to make statements about regular missionary actions, responsibilities, or effects.",
     words:["accelerates","affirms","engage","enlarges","originates","rejoices","revives","discerns","engenders","encircles","comply","conform","dictate","glorify","incorporate","persevere","preside","resonate","restrict","surpass"]},
    {m:EL_6, skill:"Speaking — explaining missionary purpose in connected, plain English",
     instruction:"Read the skill first. Explain the purpose in connected sentences, then simplify any Church-specific term that a new listener may not understand.",
     words:["atoning","baptismal","cleansed","cleansing","conversion","covenant","doctrinal","exalted","ordinance","priesthood","prophecies","purified","resurrection","sacrament","scriptural","consecration","edification","fulness","sanctifying","intercession"]},
    {m:EL_7, skill:"Grammar + speaking — forming clear WH questions",
     instruction:"Read the skill first. Build questions with a clear WH word, auxiliary when needed, subject, and main verb. Use the reinforcement vocabulary as the content of the questions.",
     words:["interpretation","clarification","perceptions","convictions","companionship","coordination","covenant","ordinance","priesthood","resurrection","sacrament","relevance","seminary","quorum","promptings","doctrinal","scriptural","symbolism","parable","comprehension"]},
    {m:EL_8, skill:"Listening + speaking — expanding follow-up answers into complete thoughts",
     instruction:"Read the skill first. Listen for the exact question, answer it directly, then add one useful detail. Reinforcement cards train you to respond calmly when the topic becomes more complex.",
     words:["apprehensive","assurances","attentive","consolation","console","engage","heartfelt","misunderstandings","perceptions","persuaded","relevance","resonate","sensitively","tact","tactfully","tenderness","compassionately","plainness","resilience","fortitude"]},
    {m:EL_9, skill:"Reading + pronunciation — scripture phrasing, stress, and intelligibility",
     instruction:"Read the skill first. Read by meaningful phrase groups, not word by word. Slow down around difficult vocabulary and keep stressed syllables and final sounds clear.",
     words:["abstinence","adversary","apprehensive","authoritative","baptismal","companionship","characteristic","clarification","denominations","doctrinal","extraordinary","manifestations","ministerial","miraculous","perceptions","persecuted","priesthood","resurrection","scriptural","sanctifying"]},
    {m:EL_10, skill:"Reading + speaking — paraphrasing scripture and explaining its main idea",
     instruction:"Read the skill first. Identify the main idea, explain it in simpler English, then reconnect it to the scripture without merely repeating the verse.",
     words:["interpretation","symbolism","symbolize","symbolic","parable","scriptural","doctrinal","cornerstone","pivotal","profound","comprehension","edification","plainness","fulness","intercession","revelators","consecration","restitution","prophecies","covenant"]}
  ];

  function group(words,start,end){ return words.slice(start,end).join(", "); }
  function reinforcementCards(skill,words){
    return [
      {t:"Reinforcement 1 · Notice and pronounce",
       content:"Read these five aloud carefully, then use **one** in a sentence that matches this mission skill: **"+group(words,0,5)+"**.",
       btn:"Open pronunciation pass"},
      {t:"Reinforcement 2 · Build with new vocabulary",
       content:"Make short, accurate sentences using these five: **"+group(words,5,10)+"**. Keep the mission skill as the priority: **"+skill+"**.",
       btn:"Open sentence pass"},
      {t:"Reinforcement 3 · Explain in plain English",
       content:"Use these five in context, then restate the idea in simpler English: **"+group(words,10,15)+"**. The goal is communication, not reciting definitions.",
       btn:"Open plain-English pass"},
      {t:"Reinforcement 4 · Transfer to a new situation",
       content:"Use these five in a changed missionary situation: **"+group(words,15,20)+"**. Make the response natural rather than forcing every word into one sentence.",
       btn:"Open transfer pass"},
      {t:"Reinforcement 5 · Mixed retrieval",
       content:"Without copying a model, create two responses that draw from this mixed set: **"+group(words,0,10)+"**. Use several naturally and keep the target skill accurate.",
       btn:"Open mixed retrieval"},
      {t:"Reinforcement 6 · Missionary scenario",
       content:"Respond to a new missionary scenario using vocabulary from: **"+group(words,10,20)+"**. Aim for clarity first, then vocabulary range.",
       btn:"Open scenario pass"}
    ];
  }

  specs.forEach((x)=>{
    x.m.mission = x.m.mission || {};
    x.m.mission.skill = x.skill;
    x.m.mission.instructions = x.instruction;
    x.m.band45ReinforcementWords = x.words.slice();
    x.m.guided = x.m.guided || [];
    const existingTitles = new Set(x.m.guided.map(g=>g.t));
    reinforcementCards(x.skill,x.words).forEach(g=>{
      if(!existingTitles.has(g.t)) x.m.guided.push(g);
    });
    if(x.m.independent){
      x.m.independent.support = x.m.independent.support || [];
      x.m.independent.support.push("Reinforcement bank: 20 Band 4/5 Preach My Gospel words were practised in this mission.");
      x.m.independent.support.push("During the final performance, use advanced vocabulary only when it fits naturally; accuracy and clarity come first.");
    }
  });

  // Instructions must be seen first; skill is explicit and tied to the mission target.
  window.missionHTML = function(){
    const instruction = S.mission.instructions || "Read the instructions before starting the mission.";
    const skill = S.mission.skill || "Integrated English communication";
    return '<div class="bcard">'+
      '<p class="label">INSTRUCTIONS</p>'+
      '<p class="why">'+formatRich(instruction)+'</p>'+
      '</div>'+
      '<div class="bcard">'+
      '<p class="label">SKILL · '+formatRich(skill)+'</p>'+
      '<p class="mission-text">'+formatRich(S.mission.text)+'</p>'+
      (S.mission.learnerNote?'<p class="why">'+formatRich(S.mission.learnerNote)+'</p>':(S.mission.why?'<p class="why">'+formatRich(S.mission.why)+'</p>':''))+
      '</div>'+
      '<button class="cta" id="next">'+(S.explanation?'Understand First':ui('startWords','Start Words First'))+'</button>';
  };

  window.KNEWBIE_STUDENT6_REINFORCEMENT = {
    source:"student6/vocabulary/preach_my_gospel_complexity_ranked.csv",
    extractedBands:"student6/vocabulary/preach_my_gospel_bands_4_5.csv",
    bands:["Band 4 - Upper-Intermediate/Advanced","Band 5 - Advanced/Academic"],
    minimumWordsPerMission:20,
    extraReinforcementCardsPerMission:6
  };
})();