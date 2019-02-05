
import Command from '@ckeditor/ckeditor5-core/src/command';
import $ from 'jquery';
import Options from './options';

export default class DriveCommand extends Command {

	constructor(editor, view) {
		super(editor);
		this.e=editor;		
		this.view=view;
		this.tempdata="";
	}
	execute( options = {} ) {

		if(!options.CallBackFrom)
		{
			options = new Options(this.e);
		}
		var auth="";
		var editor = this.e;
		if(options.CallBackFrom === '')
		{
			//console.log("First Time Clicked");
			const response=JSON.parse(options.Editor.ui.editor.getwordcount());
			const totalword = Number(response.NumberOfWord);

			if(totalword > 0)
			{
				options.CallBackFrom = "DataAlreadyExist";
				options.tempdata = "";
				window['angularComponentRef'].zone.run(() => {
					window['angularComponentRef'].component.DriveDialogBox(options);
				}); 
			}
			else
			{
				//options.Editor.setData("<p></p>");
				LoadClient();
			}
		}
		else if(options.CallBackFrom ===  "InvalidData")
		{
			options.CallBackFrom="";
			//console.log("Call Backfrom InvalidData");
			if(options.ReturnValue === true)
			{
				if($(options.tempdata).text() === '')
				{
					options.CallBackFrom = "NoTextContent";
					options.tempdata = "";
					window['angularComponentRef'].zone.run(() => {
						window['angularComponentRef'].component.DriveDialogBox(options);
					}); 
				}
				else
				{
					options.Editor.setData(options.tempdata);
					options.tempdata="";
				}
			}
		}
		else if(options.CallBackFrom === "DataAlreadyExist")
		{
			options.CallBackFrom="";
			//console.log("Call Backfrom DataAlreadyExist");
			if(options.ReturnValue === true)
				LoadClient();
		}
		else if(options.CallBackFrom === "NoTextContent" || options.CallBackFrom === 'Error')
		{
			options.CallBackFrom="";
			options.tempdata="";
		}


var gdocDelete = function (fileId) {
	//console.log("gdocdelete");
  var deleteFileAction = gapi.client.drive.files.delete({
	  fileId: fileId
  }).then(function (response) {

  },
  function (response) {

  });

}

var contentFilter = function (htmlData) {

  //create a jquery object to hold the data
  var $data = $(htmlData).wrapAll('<div />').first().parent();
  //Remove Comments
  $data.find('a[id*="cmnt"]').closest('div').remove();

  var l = $(htmlData).find(':not(' + options.Editor.config.get( 'gdAllowedHtmlTags' ) + ')').length;
  
  
  $data.find(':not(' + options.Editor.config.get( 'gdAllowedHtmlTags' ) + ')').remove();
  

  
  //wrap italics, underline, and bold text with relevant stylings.
  //Google uses inline styling font-weight:700 -> b, font-style:italics -> i, text-decoration:underline -> u
  //Internet explorer injects a space after the : so we have to search both with and without it.
  $data.find('[style*="font-weight:700"],[style*="font-weight: 700"]').wrap('<b />')
	  //Remove styling to prevent duplicate <strong> tags in ckeditor.
	  .attr('style', function (i, style) {
		  return style.replace(/font-weight:.?700/g, '');
	  });
  $data.find('[style*="font-style:italic"],[style*="font-style: italic"]').wrap('<i />')
	  .attr('style', function (i, style) {
		  return style.replace(/font-style:.?italic/g, '');
	  });
  $data.find('[style*="text-decoration:underline"],[style*="text-decoration: underline"]').wrap('<u />')
	  .attr('style', function (i, style) {
		  return style.replace(/text-decoration:.?underline/g, '');
	  });

  if(l > 0)
  {
	options.CallBackFrom = "InvalidData";
	options.tempdata = $data.html();
	window['angularComponentRef'].zone.run(() => {
		window['angularComponentRef'].component.DriveDialogBox(options);
	}); 
  }
  else if($data.text() === '')
  {
	options.CallBackFrom = "NoTextContent";
	options.tempdata = "";
	window['angularComponentRef'].zone.run(() => {
		window['angularComponentRef'].component.DriveDialogBox(options);
	}); 
  }
  else
  {
	  return $data.html();
  }
  
  return false;
}


var gdocImport = function (fileId, deleteAfter) {
	//console.log("gdocImport");
	// Calling 'showLoader()' angular method from javascript to show spinner
	window['angularLoaderComponentRef'].zone.run(() => {
		window['angularLoaderComponentRef'].component.showLoader(true);
	});
  gapi.client.drive.files.export(
			  {
				  fileId: fileId,
				  mimeType: 'text/html'
			  }).then(
			  function (response) {
				  //success
				  // Calling 'showLoader()' angular method from javascript to hide spinner
				  window['angularLoaderComponentRef'].zone.run(() => {
					window['angularLoaderComponentRef'].component.showLoader(false);
				  });
				  if (deleteAfter) {
					  gdocDelete(fileId);
				  }

				  var rawHtml = contentFilter(response.body);
				  if(rawHtml != false)
				 	 options.Editor.setData(rawHtml);
			  },
			  //Failure to load file
			  function (response) {
				  // Calling 'showLoader()' angular method from javascript to hide spinner
				  window['angularLoaderComponentRef'].zone.run(() => {
					window['angularLoaderComponentRef'].component.showLoader(false);
				  });
				  if (deleteAfter) {
					  gdocDelete(fileId);
				  }
				  cleanup({
					  content: null,
					  success: false,
					  code: response.status
				  });
			  }
			  );
}

//picker callback function to handle initial loading of the picker, canceling the picker, and selecting a document.
var pickerCallback = function (callbackObj) {
	//console.log("pickercallback");
  //Do nothing when canceled.
  if (callbackObj.action == google.picker.Action.CANCEL) {
	  return;
  }
  //Load document into CKEditor when picked.
  if (callbackObj.action == google.picker.Action.PICKED) {
	  
	  var selectDoc = callbackObj.docs[0];

	  if (selectDoc.mimeType != 'application/vnd.google-apps.document') {

		  gapi.client.drive.files.copy({
			  fileId: selectDoc.id,
			  mimeType: 'application/vnd.google-apps.document'
		  }).then(function (response) {
			  gdocImport(response.result.id, true);
		  },
		  function (response) {
			  //unable to copy
			  cleanup({
				  content: null,
				  code: response.status,
				  success: false
			  });
		  }
		  );
	  }
	  else {
		  gdocImport(selectDoc.id, false);
	  }
  }
}

var cleanup = function (response) {
	console.log(response);
	options.CallBackFrom = "Error";
	options.tempdata = "";
	window['angularComponentRef'].zone.run(() => {
						window['angularComponentRef'].component.DriveDialogBox(options);
	});
}

var loadPicker = function () {
	//console.log("loadPicker");
  gapi.client.load('https://www.googleapis.com/discovery/v1/apis/drive/v3/rest');
  var pickerView = new google.picker.View(google.picker.ViewId.DOCUMENTS);
 
	  pickerView.setMimeTypes(options.Editor.config.get( 'gdAllowedMimeTypes' ));
  
  var pickerBuilder = new google.picker.PickerBuilder().
		  addView(pickerView).
		  setOAuthToken(auth.access_token).
		  setOrigin(window.location.origin).
		  setRelayUrl(window.location.origin).
		  enableFeature(google.picker.Feature.NAV_HIDDEN).
		  setCallback(pickerCallback);

	  pickerBuilder.setSelectableMimeTypes(options.Editor.config.get( 'gdAllowedMimeTypes' ));
  
	  options.Editor.picker = pickerBuilder.build();
	  options.Editor.picker.setVisible(true);
}

function LoadClient()
{
	//console.log("LoadClient");
  var authInstance = gapi.auth2.getAuthInstance();
  //console.log(authInstance);

  if (authInstance != null && authInstance) {
	//console.log("If");
	  authInstance.signIn({
		  scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly',
		  fetch_basic_profile: false,
		  discoveryDocs: 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
	  }).then(
	  function (response) {
		  //success
		  auth = gapi.client.getToken();
		  loadPicker();
	  },
	  function (response) {
		  //failure
	  }
	  );
  }
  
  else {
	  //console.log("Else LoadClient");
	  gapi.auth2.init({
		  client_id: options.Editor.config.get( 'clientId' ),
		  scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly',
		  discoveryDocs: 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
		  fetch_basic_profile: false,

	  }).then(
	  function (response) {
		//console.log(response);
		  response.signIn()
			  .then(function (response) {
				  auth = gapi.client.getToken();
				  loadPicker();
			  });
	  },
	  function (response) {
		 //console.log("Error");
		 console.log(response);
	  });
  }
}
}
}