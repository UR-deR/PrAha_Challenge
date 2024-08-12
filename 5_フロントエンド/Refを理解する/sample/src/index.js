import ReactDOM from "react-dom";
import { Profiler } from "./Profiler";
import { SomeComponent } from "./Component";

function measurePerformance() {
  return new Promise((resolve) => {
    ReactDOM.render(
      <Profiler onFinishMeasure={resolve} Component={SomeComponent} />,
      document.getElementById("root")
    );
  });
}

main().catch(console.error);

async function main() {
  const timeToRender = await measurePerformance(SomeComponent);
  console.log(timeToRender);
}
