document.addEventListener("DOMContentLoaded", function () {
    const testData = {
        beck: {
            title: "Тест Бека (депрессия)",
            questions: [
                "Чувствовали ли вы себя подавленным в последнее время?",
                "У вас пропал интерес к привычным делам?",
                "Вы испытываете усталость и апатию?"
            ]
        },
        lusher: {
            title: "Тест Люшера (цветовой)",
            questions: [
                "Выберите цвет, который вам нравится больше всего.",
                "Выберите второй любимый цвет.",
                "Какой цвет вызывает у вас неприятные ощущения?"
            ]
        },
        spielberger: {
            title: "Тест Спилберга (тревожность)",
            questions: [
                "Часто ли вы испытываете тревогу без видимой причины?",
                "Считаете ли вы себя нервным человеком?",
                "Испытываете ли вы страх перед будущим?"
            ]
        }
    };

    const params = new URLSearchParams(window.location.search);
    const testKey = params.get("test");

    if (testKey && testData[testKey]) {
        document.getElementById("test-title").textContent = testData[testKey].title;
        const container = document.getElementById("questions-container");
        testData[testKey].questions.forEach((question, index) => {
            const div = document.createElement("div");
            div.innerHTML = `<p>${question}</p>
                <label><input type="radio" name="q${index}" value="0"> Нет</label>
                <label><input type="radio" name="q${index}" value="1"> Иногда</label>
                <label><input type="radio" name="q${index}" value="2"> Часто</label>`;
            container.appendChild(div);
        });

        document.getElementById("test-form").addEventListener("submit", function (event) {
            event.preventDefault();
            let score = 0;
            testData[testKey].questions.forEach((_, index) => {
                const selected = document.querySelector(`input[name="q${index}"]:checked`);
                if (selected) {
                    score += parseInt(selected.value);
                }
            });
            localStorage.setItem("testResult", JSON.stringify({ test: testData[testKey].title, score }));
            window.location.href = "results.html";
        });
    }

    if (window.location.pathname.includes("results.html")) {
        const resultData = JSON.parse(localStorage.getItem("testResult"));
        if (resultData) {
            document.getElementById("result-text").textContent = `Вы прошли: ${resultData.test}. Ваш балл: ${resultData.score}`;
        }
    }
});
