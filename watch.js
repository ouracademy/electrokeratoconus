const chokidar = require("chokidar");
const path = require("path");

const pentacam_autocsv_path = "/home/artmadeit/Escritorio/Prueba";
const ml_files = [
  "ZERNIKE-ELE.CSV",
  "COR-PWR-LOAD.CSV",
  "Fourier-LOAD.CSV",
  "SUMMARY-LOAD.CSV",
  "INDEX-LOAD.CSV",
  "AXLScan_Result-LOAD.CSV",
  "ZERNIKE-WFA.CSV",
  "PACHY-LOAD.CSV",
  "CorneoScleral-LOAD.CSV",
  "EccSag-LOAD.CSV",
  "CHAMBER-LOAD.CSV",
  "BADisplay-LOAD.CSV",
  "KEIO-LOAD.CSV"
].map(x => path.join(pentacam_autocsv_path, x));

// Something to use when events are received.
const log = console.log.bind(console);

const start_watch = () => {
  const watcher = chokidar.watch(ml_files);
  watcher.on("change", path => log(`File ${path} has been change`));
  return watcher;
};

module.exports = start_watch;
