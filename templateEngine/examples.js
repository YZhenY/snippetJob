module.exports = {
    header: ["Dear Sir/Madam,", "APPLICATION FOR ${company} – ${position}"],
    intro: ["I came across your job description for a ${position}, and I am very excited to apply!"],
    compliment:[ 
        " ${company} is lauded as a firm poised to bring ${technology} technology to implementation.",
        " Aside from its vibrant, dynamic environment in which leading minds interact to create unprecedented solutions, ${company} stands out to me due to its forward day-to-day working style. These factors motivate me to strive towards joining the firm, and also to be outstanding within the firm to contribute to these opportunities.",
        ], 
    selfPromotion: ["I am a full stack software developer and I would like to join Coinbase in an internship with the aim of eventually joining your firm in changing the way the world works through blockchain, while inching towards my goal of effecting social change."],
    callToAction: ["I look forward to speaking with you regarding this opportunity. Please refer to the enclosed resume for a more complete view of my background and qualifications. I can be contacted at yong.zhen.yu.1993@gmail.com or +65 81828667."],
    footer: ["Sincerely, ${name}"],
}

/* Three different strats:
    1. Simple category templating simlar to above
    2. Within longer segments split that into a build tree which builds on phrases;
    sequential structure (each node given a number, numbers determing which rank it can be, 
    seperate rank probabilities perhaps)
    3. Same as above but instead of sequential structure, nodes connect to every one of the other nodes
    creating a graph like structure with scores according to what follows

    How to think about this?
        - Amount of data i can EXPECT to have from feedback.... MOST EFFCIENT WITH WHAT I HAVE
        - SCALABILITY
        - Clear issues with links?
*/