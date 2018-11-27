const DriveCallBackApiMixin = {
	
	alreadyhavedata(result) {
        console.log(result);
        this.execute(DriveCommand);
	}

};

export default DriveCallBackApiMixin;