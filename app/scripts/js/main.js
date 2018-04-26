function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
    }
}

function buildHomeBlockHTML(block)
{
    var current = Date.now();
    var date = new Date(block.timestamp*1000);

    var _html = "<div class=\"col-md-2\">\n" +
        "            <img src=\"components/images/block.png\" height=\"120\"/>\n" +
        "        </div>\n" +
        "        <div class=\"col-md-8 text-left align-top\" id=\"block-details\" style='padding-left:2em'>\n" +
        "            <h1>New validated block</h1>\n" +
        "            <p>\n" +
        "                <strong>Validated by</strong> <br /><a href='/#/address/"+block.miner+"'>"+block.miner+"</a>\n" +
        "            </p>\n" +
        "            <p>\n" +
        "                <strong>Block Hash</strong> <br />"+block.hash+"\n" +
        "            </p>\n" +
        "        </div>\n" +
        "\n" +
        "        <div class=\"col-md-2  text-center align-middle\" style=\"padding-top:10px;\">\n" +
        "            <img src=\"components/images/clock.png\" height=\"60\"/>\n" +
        "            <p>\n" +
        "                "+timeDifference(current,date)+"\n" +
        "            </p>\n" +
        "        </div>";

    return _html;
}

function loadLatestBlock()
{
    var blockNum = parseInt(web3.eth.blockNumber, 10);
    var block   = web3.eth.getBlock(blockNum);
    $("#content").fadeOut();

    var html = buildHomeBlockHTML(block);

    $("#content").html(html);

    $("#content").fadeIn();
}

var web3 = new Web3(new Web3.providers.HttpProvider('http://217.182.142.7:8545'));
var tid = setInterval(mycode, 10000);


loadLatestBlock();

function mycode() {
    loadLatestBlock();
}
function abortTimer() { // to be called when you want to stop the timer
    $("#content").fadeOut();
    clearInterval(tid);
}
