// Salmon Farm Data Analysis Example
// Dette er ein JavaScript koða dømi fyri at greina laksafarm data

// Data struktur fyri ein laksafarm
class SalmonFarm {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.pens = [];
    this.data = {
      temperature: [],
      feedingData: [],
      growthRates: [],
      mortality: []
    };
  }

  // Legg til ein nýggjan pen
  addPen(penId, capacity) {
    this.pens.push({
      id: penId,
      capacity: capacity,
      currentStock: 0,
      healthStatus: 'healthy'
    });
  }

  // Skráseta dagligan data
  recordDailyData(date, temp, feedAmount, growth, mortalityRate) {
    this.data.temperature.push({ date, value: temp });
    this.data.feedingData.push({ date, amount: feedAmount });
    this.data.growthRates.push({ date, rate: growth });
    this.data.mortality.push({ date, rate: mortalityRate });
  }

  // Útrokna miðal vøkstur
  calculateAverageGrowth(days = 30) {
    const recentData = this.data.growthRates.slice(-days);
    if (recentData.length === 0) return 0;
    
    const sum = recentData.reduce((acc, data) => acc + data.rate, 0);
    return (sum / recentData.length).toFixed(2);
  }

  // Finn optimal fóðring basert á temperatur
  getOptimalFeeding(currentTemp) {
    // Optimal fóðring formul basert á temperatur
    if (currentTemp < 4) return 'Minimal fóðring (0.5% av biomassa)';
    if (currentTemp >= 4 && currentTemp <= 8) return 'Moderat fóðring (1% av biomassa)';
    if (currentTemp > 8 && currentTemp <= 14) return 'Optimal fóðring (1.5% av biomassa)';
    if (currentTemp > 14 && currentTemp <= 18) return 'Høg fóðring (2% av biomassa)';
    return 'Avmarkað fóðring (1% av biomassa) - temperatur ov høg';
  }

  // Sustainability score útrokning
  calculateSustainabilityScore() {
    const factors = {
      feedConversionRatio: this.calculateFCR(),
      mortalityRate: this.getAverageMortality(),
      waterQuality: this.assessWaterQuality(),
      carbonFootprint: this.estimateCarbonFootprint()
    };

    // Vektað score (0-100)
    const score = 
      (100 - factors.feedConversionRatio * 20) * 0.25 +
      (100 - factors.mortalityRate * 10) * 0.25 +
      factors.waterQuality * 0.25 +
      (100 - factors.carbonFootprint / 10) * 0.25;

    return {
      totalScore: Math.max(0, Math.min(100, score.toFixed(1))),
      breakdown: factors
    };
  }

  // Hjálpar funktión - FCR útrokning
  calculateFCR() {
    // Feed Conversion Ratio - kg fóður per kg vøkstur
    const totalFeed = this.data.feedingData.reduce((sum, d) => sum + d.amount, 0);
    const totalGrowth = this.data.growthRates.reduce((sum, d) => sum + d.rate, 0);
    return totalGrowth > 0 ? (totalFeed / totalGrowth).toFixed(2) : 0;
  }

  // Hjálpar funktión - Miðal deyðiligheit
  getAverageMortality() {
    if (this.data.mortality.length === 0) return 0;
    const sum = this.data.mortality.reduce((acc, d) => acc + d.rate, 0);
    return (sum / this.data.mortality.length).toFixed(2);
  }

  // Hjálpar funktión - Vatngóðska assessment
  assessWaterQuality() {
    // Simulert vatngóðska score basert á temperatur variabilitet
    const temps = this.data.temperature.map(t => t.value);
    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    const variance = temps.reduce((sum, t) => sum + Math.pow(t - avgTemp, 2), 0) / temps.length;
    
    // Lægri variance = betri stabilitet = hægri score
    return Math.max(0, Math.min(100, 100 - variance * 10));
  }

  // Hjálpar funktión - CO2 fótaspor estimat
  estimateCarbonFootprint() {
    // kg CO2 per kg framleiðsla (simplified estimat)
    const feedCarbon = this.calculateFCR() * 2.5; // 2.5 kg CO2 per kg fóður
    const operationsCarbon = 1.5; // Fast operational CO2
    return feedCarbon + operationsCarbon;
  }

  // Generera rapport
  generateReport() {
    console.log(`\n========== ${this.name} - Rapport ==========`);
    console.log(`Plasering: ${this.location}`);
    console.log(`Tal á pens: ${this.pens.length}`);
    console.log(`\nLyktal Indikatorar:`);
    console.log(`- Miðal vøkstur (30 dagar): ${this.calculateAverageGrowth()}%`);
    console.log(`- FCR: ${this.calculateFCR()}`);
    console.log(`- Miðal deyðiligheit: ${this.getAverageMortality()}%`);
    console.log(`\nSustainability Score:`);
    const sustainability = this.calculateSustainabilityScore();
    console.log(`- Total Score: ${sustainability.totalScore}/100`);
    console.log(`- CO2 fótaspor: ${sustainability.breakdown.carbonFootprint} kg CO2/kg`);
    console.log('==========================================\n');
  }
}

// Dømi um nýtslu
function runExample() {
  // Stovna nýggja farm
  const myFarm = new SalmonFarm('Bakkafrost Site A', 'Funningsfjørður');
  
  // Legg til pens
  myFarm.addPen('PEN-001', 50000);
  myFarm.addPen('PEN-002', 50000);
  myFarm.addPen('PEN-003', 45000);
  
  // Simuler 30 dagar av data
  const startDate = new Date('2024-01-01');
  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    // Simuler daglig data (realistisk variation)
    const temp = 8 + Math.sin(i / 10) * 2 + Math.random() * 0.5;
    const feed = 1000 + Math.random() * 200;
    const growth = 1.5 + Math.random() * 0.5;
    const mortality = 0.05 + Math.random() * 0.02;
    
    myFarm.recordDailyData(
      currentDate.toISOString().split('T')[0],
      temp,
      feed,
      growth,
      mortality
    );
  }
  
  // Generer rapport
  myFarm.generateReport();
  
  // Test optimal fóðring recommendation
  console.log('Fóðring Vegleiðing:');
  [4, 8, 12, 16, 20].forEach(temp => {
    console.log(`  ${temp}°C: ${myFarm.getOptimalFeeding(temp)}`);
  });
}

// Koyr dømi
runExample();

// Export fyri at nýta í øðrum modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SalmonFarm };
}