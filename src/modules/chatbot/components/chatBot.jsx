import React, { useState } from 'react';
import '../ChatBot.css';

const healthFacts = [
  "Track gratitude and achievement with a journal. Include 3 things you were grateful for and 3 things you were able to accomplish each day.",
  "Start your day with a cup of coffee. Coffee consumption is linked to lower rates of depression. If you can't drink coffee because of the caffeine, try another good-for-you drink like green tea.",
  "Take time to laugh. Hang out with a funny friend, watch a comedy or check out cute videos online. Laughter helps reduce anxiety.",
  "Sometimes, we don't need to add new activities to get more pleasure. We just need to soak up the joy in the ones we've already got. Trying to be optimistic doesn't mean ignoring the uglier sides of life. It just means focusing on the positive as much as possible.",
  "Feeling anxious? Take a trip down memory lane and do some coloring for about 20 minutes to help you clear your mind. Pick a design that's geometric and a little complicated for the best effect.",
  "There is no greater agony than bearing an untold story inside of you.” -Maya Angelou. If you have personal experience with mental illness or recovery, share on Twitter, Instagram and Tumblr with #mentalillnessfeelslike.",
  "Has something been bothering you? Let it all out…on paper. Writing about upsetting experiences can reduce symptoms of depression.",
  "Spend some time with a furry friend. Time with animals lowers the stress hormone - cortisol, and boosts oxytocin - which stimulates feelings of happiness. If you don’t have a pet, hang out with a friend who does or volunteer at a shelter.",
  "What lies before us and what lies behind us are small matters compared to what lies within us. And when you bring what is within out into the world, miracles happen.” - Henry David Thoreau. Practice mindfulness by staying 'in the present.' Try these tips.",
  "Do your best to enjoy 15 minutes of sunshine, and apply sunscreen. Sunlight synthesizes Vitamin D, which experts believe is a mood elevator.",
  "Take 30 minutes to go for a walk in nature - it could be a stroll through a park, or a hike in the woods. Research shows that being in nature can increase energy levels, reduce depression and boost well-being.",
  "Learn to understand and manage your feelings.",
  "Find ways to learn and be creative.",
  "Work some omega-3 fatty acids into your diet–they are linked to decreased rates of depression and schizophrenia among their many benefits. Fish oil supplements work, but eating your omega-3s in foods like wild salmon, flaxseeds or walnuts also helps build healthy gut bacteria.",
  "Anyone who has never made a mistake has never tried anything new. -Albert Einstein. Try something outside of your comfort zone to make room for adventure and excitement in your life.",
  "Staying active is as good for the brain as it is for the body. Regular exercise or activity can have a major impact on your mental and emotional health, relieve stress, improve memory, and help you sleep better.",
  "Talk to a friendly face. If you have concerns, stresses or worries, sharing these with someone who cares is one of the most effective ways to calm your nervous system and relieve stress. And vice versa: Sometimes listening to others in a safe and supported way can help you develop wider perspectives. It is important that both parties feel comfortable to share and hear each other's thoughts, and if the worries are beyond this, consider speaking to a professional (see programs and resources at the end of the article).",







];

const ChatBot = () => {
  const [fact, setFact] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatBot = () => {
    if (!isOpen) {
      const randomFact = healthFacts[Math.floor(Math.random() * healthFacts.length)];
      setFact(randomFact);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-button" onClick={toggleChatBot}>
        <span>💬</span>
      </button>
      {isOpen && (
        <div className="chatbot-message">
          {fact}
        </div>
      )}
    </div>
  );
};

export default ChatBot;