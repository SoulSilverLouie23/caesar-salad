const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const outputCard = document.getElementById('outputCard');
const output = document.getElementById('output');

const skillToOffer = {
  writing: 'newsletter + content planner',
  design: 'brand kit + social post templates',
  coding: 'simple lead-capture web app',
  marketing: 'local customer acquisition dashboard',
  research: 'competitor insight digest'
};

function buildPlan(niche, skill, hours) {
  const offer = skillToOffer[skill] || 'digital service bundle';
  const lowTicket = 19;
  const highTicket = 99;
  const monthlyTarget = Math.max(200, hours * 60);
  const neededLow = Math.ceil(monthlyTarget / lowTicket);
  const neededHigh = Math.ceil(monthlyTarget / highTicket);

  return {
    idea: `A micro-app for ${niche} that sells a ${offer} and captures emails for repeat offers.`,
    monetization: `Start with $${lowTicket} self-serve templates and a $${highTicket} done-with-you upsell.`,
    target: `Goal: ~$${monthlyTarget}/month using ${hours} hours/week. You need ~${neededLow} low-ticket sales OR ~${neededHigh} high-ticket sales monthly.`,
    launchSteps: [
      'Create a landing page and one free lead magnet.',
      'Post 1 short-form tip per day in communities where your niche hangs out.',
      'Collect feedback from first 5 users and tighten the offer.',
      'Automate delivery with email + a shared drive/template link.',
      'Reinvest first revenue into better design or paid reach.'
    ]
  };
}

generateBtn.addEventListener('click', () => {
  const niche = document.getElementById('niche').value.trim() || 'small local businesses';
  const skill = document.getElementById('skill').value;
  const hours = Number(document.getElementById('hours').value) || 4;

  const plan = buildPlan(niche, skill, hours);

  output.innerHTML = `
    <p><strong>App idea:</strong> ${plan.idea}</p>
    <p><strong>Monetization:</strong> ${plan.monetization}</p>
    <p><strong>Math:</strong> ${plan.target}</p>
    <p><strong>Launch checklist:</strong></p>
    <ul>${plan.launchSteps.map(step => `<li>${step}</li>`).join('')}</ul>
  `;

  outputCard.classList.remove('hidden');
});

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(output.innerText);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => (copyBtn.textContent = 'Copy plan'), 1200);
  } catch {
    copyBtn.textContent = 'Copy failed';
  }
});
