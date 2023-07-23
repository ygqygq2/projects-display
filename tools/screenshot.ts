import CDP from "chrome-remote-interface";
import fs from "fs";

// CLI Args
const argv = require("minimist")(process.argv.slice(2));
const url: string = argv.url || "https://www.google.com";
const format: "jpeg" | "png" = argv.format === "jpeg" ? "jpeg" : "png";
const viewportWidth: number = argv.viewportWidth || 1440;
const viewportHeight: number = argv.viewportHeight || 900;
const delay: number = argv.delay || 0;
const userAgent: string = argv.userAgent;
const fullPage: boolean = argv.full;

// Start the Chrome Debugging Protocol
CDP(async (client) => {
  // Extract used DevTools domains.
  const { DOM, Emulation, Network, Page, Runtime } = client;

  // Enable events on domains we are interested in.
  await Page.enable();
  await DOM.enable();
  await Network.enable();

  // If user agent override was specified, pass it to the Network domain.
  if (userAgent) {
    await Network.setUserAgentOverride({ userAgent });
  }

  // Set up viewport resolution, etc.
  const deviceMetrics = {
    width: viewportWidth,
    height: viewportHeight,
    deviceScaleFactor: 0,
    mobile: false,
    fitWindow: false,
  };
  await Emulation.setDeviceMetricsOverride(deviceMetrics);
  await Emulation.setVisibleSize({ width: viewportWidth, height: viewportHeight });

  // Navigate to target page
  await Page.navigate({ url });

  // Wait for page load event to take screenshot
  Page.loadEventFired(async () => {
    // If the `full` CLI option was passed, we need to measure the height of
    // the rendered page and use Emulation.setVisibleSize
    if (fullPage) {
      const {
        root: { nodeId: documentNodeId },
      } = await DOM.getDocument();
      const { nodeId: bodyNodeId } = await DOM.querySelector({
        selector: "body",
        nodeId: documentNodeId,
      });
      const {
        model: { height },
      } = await DOM.getBoxModel({ nodeId: bodyNodeId });

      await Emulation.setVisibleSize({ width: viewportWidth, height: height });
      // This forceViewport call ensures that content outside the viewport is
      // rendered, otherwise it shows up as grey. Possibly a bug?
      await Emulation.forceViewport({ x: 0, y: 0, scale: 1 });
    }

    setTimeout(async () => {
      const screenshot = await Page.captureScreenshot({ format });
      const buffer = Buffer.from(screenshot.data, "base64");
      fs.writeFile("output.png", buffer, "base64", (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Screenshot saved");
        }
        client.close();
      });
    }, delay);
  });
}).on("error", (err) => {
  console.error("Cannot connect to browser:", err);
});
