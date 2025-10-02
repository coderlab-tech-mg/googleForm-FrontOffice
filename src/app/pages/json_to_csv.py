import json
import csv

json_file = "googleform.json"
csv_file = "googleform_real.csv"

with open(json_file, encoding="utf-8") as f:
    data = json.load(f)

rows = []

for form in data if isinstance(data, list) else [data]:
    for item in form.get("items", []):
        if item.get("type") == "questionItem" or "questionItem" in item:
            q = item["questionItem"]["question"]
            question_text = item.get("title", "")
            points = q.get("grading", {}).get("pointValue", "")
            q_type = ""
            options_list = []
            correct_answers = set()

            if "choiceQuestion" in q:
                q_type = q["choiceQuestion"]["type"]
                options_list = [opt.get("value", "") for opt in q["choiceQuestion"].get("options", [])]
                correct_answers = {ans.get("value") for ans in q.get("grading", {}).get("correctAnswers", {}).get("answers", [])}
            elif "textQuestion" in q:
                q_type = "text"

            row = {
                "Question": question_text,
                "Points": points,
                "Type": q_type
            }
            for i, opt in enumerate(options_list):
                row[f"Option{i+1}"] = opt
                row[f"Correct{i+1}"] = "true" if opt in correct_answers else "false"

            rows.append(row)

fieldnames = ["Question", "Points", "Type"]
max_options = max([len([k for k in r if k.startswith("Option")]) for r in rows])
for i in range(1, max_options//2 + 1):
    fieldnames += [f"Option{i}", f"Correct{i}"]

with open(csv_file, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print(f"Conversion terminée dans {csv_file}")
