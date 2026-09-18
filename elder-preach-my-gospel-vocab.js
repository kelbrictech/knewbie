/* Elder / Preach My Gospel vocabulary integration
   Meanings are concise paraphrases aligned to the 2023 Preach My Gospel manual
   and official Church Topics pages. This file augments EL_1..EL_10 at runtime. */
(function(){
  const V = {
    missionary:{m:"A servant called to invite others to come unto Christ and help them receive the restored gospel."},
    companion:{m:"The missionary assigned to work, study, plan, and teach with you."},
    scripture:{m:"Sacred writings that contain God's word, prophetic teachings, and inspired accounts of God's dealings with His children."},
    testimony:{m:"A spiritual witness given by the Holy Ghost."},
    covenant:{m:"A sacred promise with God; God promises blessings as we keep our promises to Him."},
    ordinance:{m:"A sacred act or ceremony performed by priesthood authority."},
    priesthood:{m:"God's power and authority, including authority He gives people to act in His name."},
    repentance:{m:"Turning to God and away from sin so our thoughts, desires, and actions become more aligned with His will."},
    Restoration:{m:"The return of the fulness of Jesus Christ's gospel, Church, and priesthood authority through the Prophet Joseph Smith."},
    revelation:{m:"Communication and guidance from God to His children."},
    diligence:{m:"Consistent, valiant effort."},
    discern:{m:"To recognize what is true or needed, especially with careful judgment and the guidance of the Spirit."},
    Atonement:{m:"Jesus Christ's saving sacrifice, through which repentance, forgiveness, resurrection, and redemption are possible."},
    apostasy:{m:"A falling away from the gospel and from authorized priesthood leadership."},
    dispensation:{m:"A period when the Lord gives priesthood authority, doctrine, and gospel responsibilities to His servants."},
    resurrection:{m:"The reuniting of spirit and body after death, made possible through Jesus Christ."},
    redemption:{m:"Deliverance from sin and death through Jesus Christ."},
    sanctified:{m:"Made holy or purified through Jesus Christ and the Holy Ghost."},
    disciple:{m:"A follower of Jesus Christ who learns from Him and seeks to live His teachings."},
    discipleship:{m:"The continuing life and practice of following Jesus Christ."},
    endowment:{m:"A sacred gift from God; in Church usage, also refers to a temple ordinance and its associated covenants."},
    exaltation:{m:"The highest state of salvation, living eternally in God's presence and becoming like Him."},
    steadfastness:{m:"Remaining firm, faithful, and committed to Jesus Christ."},
    discernment:{m:"The ability to recognize or understand truth, needs, and spiritual guidance."},
    righteousness:{m:"Living in harmony with God's commandments and will."},
    adversary:{m:"An opponent; in gospel context, a name used for Satan as the enemy of righteousness."},
    temptation:{m:"Enticement or pressure to act contrary to God's commandments."},
    confirmation:{m:"The ordinance after baptism in which a person is confirmed a Church member and invited to receive the gift of the Holy Ghost."},
    baptismal:{m:"Relating to baptism or to the covenant made at baptism."},
    sacrament:{m:"The ordinance in which Church members partake of bread and water in remembrance of Jesus Christ and renew covenants."},
    ministry:{m:"Service to God and to His children."},
    commission:{m:"An authorized assignment or responsibility to carry out the Lord's work."},
    doctrine:{m:"A truth or teaching of the gospel of Jesus Christ."},
    prophecy:{m:"A message or declaration inspired by God through a prophet."},
    reformer:{m:"A person who seeks to correct or improve teachings, practices, or institutions."},
    crucified:{m:"Put to death on a cross; Jesus Christ was crucified and later resurrected."},
    eternal:{m:"Without end; in gospel usage, connected with God and everlasting life."},
    salvation:{m:"Being saved from sin and death through Jesus Christ."},
    conversion:{m:"A deep and continuing change of heart toward Jesus Christ and His gospel."},
    commitment:{m:"A decision or promise to act; missionaries invite people to make and keep commitments that build faith."},
    companionship:{m:"The partnership of missionaries assigned to serve together."},
    diligently:{m:"With consistent, valiant effort."},
    apprehensive:{m:"Worried or uneasy about what may happen."},
    referral:{m:"Information about a person who may be interested in meeting missionaries."},
    coordination:{m:"Organizing people and efforts so they work together effectively."},
    congregation:{m:"A group of people gathered for worship."},
    ministering:{m:"Caring for and serving people in Christlike ways."},
    inspiration:{m:"Guidance or influence that helps a person know or do what is right."},
    promptings:{m:"Spiritual impressions or guidance from the Holy Ghost."},
    magnify:{m:"To increase or strengthen; in gospel service, to fulfill a calling or responsibility faithfully."},
    fortified:{m:"Strengthened or made better able to resist difficulty or temptation."},
    alienated:{m:"Separated, distant, or made to feel disconnected from others."},
    abundance:{m:"A large or plentiful amount."},
    keystone:{m:"The central supporting part of something; the Book of Mormon is described as a keystone of the religion."},
    fulness:{m:"Completeness; in gospel usage, the complete set of saving truths and ordinances God has revealed."},
    apprehension:{m:"Anxiety or worry about what may happen."},
    adversity:{m:"Hardship, opposition, or difficult circumstances."},
    perspective:{m:"A way of seeing or understanding a situation."},
    agency:{m:"The God-given ability and responsibility to choose and act."},
    accountability:{m:"Responsibility for choices and actions."},
    consecration:{m:"Dedicating oneself, time, means, or abilities to God and His purposes."},
    stewardship:{m:"A responsibility entrusted to a person, for which that person is accountable."},
    ordination:{m:"The authorized conferral of priesthood office by the laying on of hands."},
    reconciliation:{m:"Restoring peace, harmony, or a damaged relationship."},
    restitution:{m:"Making amends by returning, repairing, or compensating for what was lost or harmed."}
  };

  const sources = {
    pmg:"https://www.churchofjesuschrist.org/study/manual/preach-my-gospel-2023?lang=eng",
    purpose:"https://www.churchofjesuschrist.org/study/manual/preach-my-gospel-2023/03-chapter-1?lang=eng",
    gospel:"https://www.churchofjesuschrist.org/study/manual/preach-my-gospel-2023/04-chapter-3/10-chapter-3-lesson-3?lang=eng",
    spirit:"https://www.churchofjesuschrist.org/study/manual/preach-my-gospel-2023/12-chapter-4?lang=eng",
    bookOfMormon:"https://www.churchofjesuschrist.org/study/manual/preach-my-gospel-2023/13-chapter-5?lang=eng",
    language:"https://www.churchofjesuschrist.org/study/manual/preach-my-gospel-2023/15-chapter-7?lang=eng",
    goals:"https://www.churchofjesuschrist.org/study/manual/preach-my-gospel-2023/16-chapter-8?lang=eng",
    testimony:"https://www.churchofjesuschrist.org/study/manual/gospel-topics/testimony?lang=eng",
    revelation:"https://www.churchofjesuschrist.org/study/manual/gospel-topics/revelation?lang=eng",
    priesthood:"https://www.churchofjesuschrist.org/study/manual/gospel-topics/priesthood?lang=eng",
    scripture:"https://www.churchofjesuschrist.org/study/manual/gospel-topics/scriptures-study-guide?lang=eng"
  };

  const plan = [
    {m:EL_1, terms:["missionary","companion","scripture","testimony","diligence","discipleship"], model:"I am preparing to serve as a missionary in South Africa. I will study scripture diligently, work with my companion, and grow as a disciple of Jesus Christ."},
    {m:EL_2, terms:["testimony","ministry","commitment","conversion","salvation","disciple","discipleship"], model:"I chose to serve because my testimony of Jesus Christ is important to me. I want my ministry to help people strengthen faith, make meaningful commitments, and move toward conversion."},
    {m:EL_3, terms:["priesthood","covenant","ordinance","repentance","Restoration","scripture","baptismal"], model:"A missionary may explain that baptism is an ordinance performed by priesthood authority and that it begins a sacred covenant with God."},
    {m:EL_4, terms:["revelation","testimony","repentance","Restoration","resurrection","discipleship","missionary","companion"], model:"Practise clear word stress in revelation, testimony, repentance, Restoration, resurrection, discipleship, missionary, and companion."},
    {m:EL_5, terms:["ministering","commitment","agency","accountability","diligently","stewardship","coordination"], model:"Missionaries study diligently, respect each person's agency, keep commitments, coordinate with others, and treat their assignments as a stewardship."},
    {m:EL_6, terms:["doctrine","covenant","ordinance","priesthood","repentance","salvation","conversion","Restoration","Atonement","revelation"], model:"Our purpose is to invite people to come unto Christ. We teach His doctrine, invite repentance, explain covenants and ordinances, and help people understand the Restoration and the saving power of Jesus Christ's Atonement."},
    {m:EL_7, terms:["scripture","doctrine","testimony","covenant","agency","revelation","discern","perspective"], model:"What does this scripture teach? How did you understand that doctrine? What questions do you have about covenant, revelation, or agency?"},
    {m:EL_8, terms:["discern","promptings","revelation","perspective","adversity","apprehensive","accountability","inspiration","fortified"], model:"If someone sounds apprehensive, listen carefully, discern the question, respect the person's perspective, and respond in a way that leaves room for agency and personal revelation."},
    {m:EL_9, terms:["Atonement","resurrection","redemption","sanctified","righteousness","steadfastness","prophecy","crucified","eternal","salvation"], model:"Read slowly enough that words such as Atonement, crucified, resurrection, redemption, righteousness, and eternal salvation remain clear."},
    {m:EL_10,terms:["doctrine","testimony","revelation","discernment","keystone","fulness","reconciliation","consecration","stewardship","apostasy","dispensation","ordination"], model:"Explain the main doctrine in your own words. Use discernment to decide what matters most, support the explanation with scripture or testimony, and connect it clearly to the Restoration when relevant."}
  ];

  function item(term){
    const entry=V[term]||{m:""};
    return {w:term,m:entry.m,e:"Use '"+term+"' accurately in a missionary sentence."};
  }
  function addUniqueVocab(mission,terms){
    mission.vocab=mission.vocab||[];
    const seen=new Set(mission.vocab.map(v=>String(v.w||"").toLowerCase()));
    terms.forEach(t=>{ if(!seen.has(t.toLowerCase())) mission.vocab.push(item(t)); });
  }
  function addWordChecks(mission,terms){
    mission.wordCheck=mission.wordCheck||[];
    const chosen=terms.slice(0,3);
    chosen.forEach((t,i)=>{
      const correct=V[t].m;
      const distractor=i===0?"A word used only to describe a building.":i===1?"A casual greeting with no gospel meaning.":"A word meaning to avoid all responsibility.";
      mission.wordCheck.push({
        q:"In this missionary context, what does **"+t+"** mean?",
        opts:[correct,distractor],
        c:0,
        ok:"Correct. Use the word in a complete sentence before continuing.",
        bad:"Choose the Church-aligned meaning used in this course."
      });
    });
  }
  function strengthenMission(mission,terms,model){
    addUniqueVocab(mission,terms);
    addWordChecks(mission,terms);
    mission.guided=mission.guided||[];
    mission.guided.push({
      t:"Preach My Gospel vocabulary transfer",
      content:"Use at least **three** of these words naturally: **"+terms.join(", ")+"**. Do not recite definitions; communicate a real idea.",
      btn:"Practise vocabulary in context"
    });
    mission.guided.push({
      t:"Explain without jargon",
      content:"Choose one difficult word above. Explain the same idea again in simpler English as if the listener has never heard the Church term before.",
      btn:"Practise plain-English explanation"
    });
    if(mission.independent){
      mission.independent.support=mission.independent.support||[];
      mission.independent.support.push("Vocabulary target: use at least two accurately — "+terms.join(", ")+".");
      mission.independent.support.push("If you use a Church-specific word, be ready to explain it in plain English.");
      mission.independent.prompt += " Use at least two target Preach My Gospel vocabulary words accurately and explain one of them in plain English if needed.";
      mission.independent.model = model+" "+mission.independent.model;
    }
    mission.pmgVocabulary=terms.slice();
    mission.pmgVocabularySources=sources;
  }

  plan.forEach(x=>strengthenMission(x.m,x.terms,x.model));

  window.KNEWBIE_PMG_VOCABULARY=V;
  window.KNEWBIE_PMG_VOCABULARY_SOURCES=sources;
})();