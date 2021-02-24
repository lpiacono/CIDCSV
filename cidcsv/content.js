// content.js
async function act(){

	    document.querySelector('button[data-test-selector="falcon-popover-trigger"]').click();
		rows = "";
		while(document.querySelectorAll('li[data-test-selector="falcon-select-listbox-option"]').length < 1) {
		  await new Promise(r => setTimeout(r, 500));
		}
		rows = document.querySelectorAll('li[data-test-selector="falcon-select-listbox-option"]');

		var csv = [];
		var row = [];

		row.push('"' + 'CIDName' + '"' + ',' + '"' + 'CIDNumber' + '"')

		for (var i = 0; i < rows.length; ++i) {
		console.log(rows[i].innerText)
		data = rows[i].innerText
		data = data.replace(/(?:\r\n|\r|\n)/g, ',');
		values = data.split(",")

		row.push('"' + values[0] + '"' + ',' + '"' + values[1] + '"')
		}

		var csv_string = row.join('\n')

		var filename = 'cidlist.csv';
		var link = document.createElement('a');
		link.style.display = 'none';
		link.setAttribute('target', '_blank');
		link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
		link.setAttribute('download', filename);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log("clicked")
    if( request.message === "clicked_browser_action" ) {
    	act();
    }
  }
);