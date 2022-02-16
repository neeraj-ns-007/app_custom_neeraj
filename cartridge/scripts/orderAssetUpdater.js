var FileWriter = require("dw/io/FileWriter");
var File = require("dw/io/File");
var logger = require("dw/system/Logger");
var OrderMgr = require("dw/order/OrderMgr");
var Transaction = require("dw/system/Transaction");

var date = new Date();

function execute(args) {
  var sharedLibrary = "src";
  var destinationPath = File.IMPEX + "/" + sharedLibrary + "/NeerajFileFolder/";

  var destinationFile = new File(
    destinationPath + "ordersList" + date.getTime() + ".csv"
  );

  OrderMgr.processOrders(callback, "");

  writeFile(destinationFile);
}
var count = 1;
var Orders = [];

Orders[0] = "Order Number,Customer Name,Customer Email,Total Gross Price,Currency Code";

function callback(Order) {
  if (Order.exportStatus == 2) {
    Orders[count] =
      Order.orderNo + ","+ Order.customerName + "," + Order.customerEmail + "," + Order.totalGrossPrice + "," + Order.currencyCode;
    Transaction.begin();
    Order.exportStatus = 1;
    Transaction.commit();
    count++;
  } 
//   else {
//     Transaction.begin();
//     Order.exportStatus = 2;
//     Transaction.commit();
//   }
}

function writeFile(destinationFile) {
  var fileWriter = new FileWriter(destinationFile, "UTF-8");

  try {
    for (var i = 0; i < Orders.length; i++) {
      fileWriter.writeLine(Orders[i]);
    }
  } catch (ex) {
    logger.error("[ERROR][Asset Updater Job] - " + ex);
  } finally {
    fileWriter.flush();
    fileWriter.close();
  }
}

module.exports = {
  execute: execute,
};
