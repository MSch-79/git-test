




      "use strict";
      const workouts = Array.from(document.querySelectorAll("details.workout"));
      const status = document.getElementById("status");
      function setWorkouts(open) {
        workouts.forEach((item) => {
          item.open = open;
        });
        status.textContent = open
          ? "All 179 workout instructions expanded."
          : "All workout instructions collapsed.";
      }
      document
        .getElementById("expand")
        .addEventListener("click", () => setWorkouts(true));
      document
        .getElementById("collapse")
        .addEventListener("click", () => setWorkouts(false));
      document
        .getElementById("week-select")
        .addEventListener("change", (event) => {
          const target = document.getElementById(event.target.value);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            history.replaceState(null, "", "#" + target.id);
          }
        });
      let beforePrint = null;
      window.addEventListener("beforeprint", () => {
        beforePrint = workouts.map((item) => item.open);
        workouts.forEach((item) => {
          item.open = true;
        });
      });
      window.addEventListener("afterprint", () => {
        if (beforePrint) {
          workouts.forEach((item, index) => {
            item.open = beforePrint[index];
          });
          beforePrint = null;
        }
      });
      document
        .getElementById("print")
        .addEventListener("click", () => window.print());
