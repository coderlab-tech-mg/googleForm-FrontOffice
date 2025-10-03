const fs = require('fs');
const data = JSON.parse(fs.readFileSync('googleform.json', 'utf8'));
let csv = 'Section,Question,Points,Type,Option1,Correct1,Option2,Correct2,Option3,Correct3,Option4,Correct4,Option5,Correct5\n';
let currentSection = 'Generale';

data.items.forEach(item => {
    if (item.pageBreakItem) {
        currentSection = item.title || currentSection;
        return;
    }

    if (!item.questionItem) return;

    const question = item.title || '';
    const q = item.questionItem.question;
    const points = (q.grading && q.grading.pointValue) || 0;
    const type = (q.choiceQuestion && q.choiceQuestion.type ? q.choiceQuestion.type.toLowerCase() : 'text');
    const options = [];

    if (q.choiceQuestion && q.choiceQuestion.options) {
        const corrects = (q.grading && q.grading.correctAnswers && q.grading.correctAnswers.answers.map(a => a.value)) || [];
        q.choiceQuestion.options.forEach((opt) => {
            options.push(opt.value || 'Autre');
            options.push(corrects.includes(opt.value) ? 'true' : 'false');
        });
    }

    while (options.length < 10) options.push('', '');
    csv += `${currentSection},${question},${points},${type},${options.join(',')}\n`;
});

fs.writeFileSync('form.csv', csv);
console.log('CSV généré : form.csv');
