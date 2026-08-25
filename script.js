// ==========================================
// SKILLUP — СТРАНИЦА КУРСА
// ==========================================

const lessonButtons =
    document.querySelectorAll(".lesson-link");

const lessons =
    document.querySelectorAll(".lesson");

const completeButtons =
    document.querySelectorAll(".complete-button");

const progressFill =
    document.getElementById("progressFill");

const progressText =
    document.getElementById("progressText");

const courseFinished =
    document.getElementById("courseFinished");


let completedLessons =
    JSON.parse(
        localStorage.getItem("skillup-progress")
    ) || [];


// ------------------------------------------
// ОТКРЫТИЕ УРОКА
// ------------------------------------------

lessonButtons.forEach(button => {

    button.addEventListener("click", () => {

        const lessonNumber =
            button.dataset.lesson;


        lessonButtons.forEach(item => {
            item.classList.remove("active");
        });


        lessons.forEach(lesson => {
            lesson.classList.remove("active");
        });


        button.classList.add("active");


        const selectedLesson =
            document.getElementById(
                `lesson-${lessonNumber}`
            );


        if (selectedLesson) {
            selectedLesson.classList.add("active");
        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


// ------------------------------------------
// ЗАВЕРШЕНИЕ УРОКА
// ------------------------------------------

completeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const lessonNumber =
            button.dataset.complete;


        if (
            !completedLessons.includes(
                lessonNumber
            )
        ) {

            completedLessons.push(
                lessonNumber
            );

        }


        localStorage.setItem(
            "skillup-progress",
            JSON.stringify(completedLessons)
        );


        updateProgress();


        // автоматически открываем следующий урок

        const nextLesson =
            Number(lessonNumber) + 1;


        if (nextLesson <= 4) {

            setTimeout(() => {

                const nextButton =
                    document.querySelector(
                        `[data-lesson="${nextLesson}"]`
                    );


                if (nextButton) {
                    nextButton.click();
                }

            }, 400);

        }

    });

});


// ------------------------------------------
// ОБНОВЛЕНИЕ ПРОГРЕССА
// ------------------------------------------

function updateProgress() {

    const totalLessons = 4;

    const percentage =
        Math.round(
            completedLessons.length /
            totalLessons *
            100
        );


    if (progressFill) {
        progressFill.style.width =
            `${percentage}%`;
    }


    if (progressText) {
        progressText.textContent =
            `${percentage}%`;
    }


    lessonButtons.forEach(button => {

        const lessonNumber =
            button.dataset.lesson;


        if (
            completedLessons.includes(
                lessonNumber
            )
        ) {

            button.classList.add(
                "completed"
            );

        }

    });


    completeButtons.forEach(button => {

        const lessonNumber =
            button.dataset.complete;


        if (
            completedLessons.includes(
                lessonNumber
            )
        ) {

            button.classList.add(
                "completed"
            );

            button.textContent =
                "✓ Урок завершён";

        }

    });


    if (
        completedLessons.length ===
        totalLessons
    ) {

        if (courseFinished) {
            courseFinished.style.display =
                "block";
        }

    }

}


updateProgress();