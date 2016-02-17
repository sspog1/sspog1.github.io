
function TodoController ($scope) {

	$scope.localStoreName = 'example';	//Wee beastindependentie
//	$scope.localStoreName = 'codeAKilt';
	$scope.CLOSED_VERSUS_OPEN 	= 0;
	$scope.RECOGNITION 			= 1;
	$scope.TIME_BOXING 			= 2;
	$scope.CULTURAL_RELEVANCE 	= 3;
	$scope.RISK_AND_REWARD	 	= 4;
	$scope.DRIVER_SHIFTING	 	= 5;
	$scope.GROUPING			 	= 6;
	$scope.SESSION_SHAPE	 	= 7;
	$scope.DETAILS			 	= 8;


    $scope.appTitle = "Learning Dimensions";
 	$scope.loadedIndex = 0;
    $scope.ldLoadedTitle = "title";
    $scope.ldLoadedDescription = "description";
    
    
    $scope.ldData  = [
		{ index:$scope.CLOSED_VERSUS_OPEN, 	id:"CL",title:"Closed versus Open",	description:"description", structure: "", hasStructure: false},
		{ index:$scope.RECOGNITION, 		id:"RE",title:"Recognition",		description:"description", structure: "", hasStructure: false},
		{ index:$scope.TIME_BOXING, 		id:"TB",title:"Time Boxing",		description:"description", structure: "", hasStructure: false},
		{ index:$scope.CULTURAL_RELEVANCE, 	id:"CR",title:"Cultural Relevance",	description:"description", structure: "", hasStructure: false},
		{ index:$scope.RISK_AND_REWARD, 	id:"RR",title:"Risk and Reward",	description:"description", structure: "", hasStructure: false},
		{ index:$scope.DRIVER_SHIFTING, 	id:"DS",title:"Driver Shifting",	description:"description", structure: "", hasStructure: false},
		{ index:$scope.GROUPING, 			id:"GP",title:"Grouping",			description:"description", structure: "", hasStructure: false},
		{ index:$scope.SESSION_SHAPE, 		id:"SS",title:"Session Shape",		description:"description", structure: "", hasStructure: false},
		{ index:$scope.DETAILS, 			id:"DT",title:"Details",			description:"description", structure: "", hasStructure: false}
	];

    $scope.someSavedText = localStorage.getItem($scope.localStoreName);
	$scope.index = (localStorage.getItem('id') !== null) ? localStorage.getItem(scope.localStoreName) : 1;

    $scope.localStorageArray = ($scope.someSavedText !== "undefined" && $scope.someSavedText !== null) ? JSON.parse($scope.someSavedText) :
		[
			{id: "DT", ldName: "Details", 			 text: "", hasControl: null}, //nasty hack
			{id: "CL", ldName: "Closed versus Open", text: "", hasControl: false},
			{id: "RE", ldName: "Recognition",		 text: "", hasControl: false},
			{id: "TB", ldName: "Time Boxing",		 text: "", hasControl: false},
			{id: "CR", ldName: "Cultural Relevance", text: "", hasControl: false},
			{id: "RR", ldName: "Risk and Reward",	 text: "", hasControl: false},
			{id: "DS", ldName: "Driver Shifting",	 text: "", hasControl: false},
			{id: "GP", ldName: "Grouping",			 text: "", hasControl: false},
			{id: "SS", ldName: "Session Shape",		 text: "", hasControl: false}
		];

	$scope.loadedNote = null;


	/**
	 * 	This is called when index and show all are loaded and it populates the descriptions
	 * 	on the ldDatat array and loads up a default item
	 *
	 * 	in addition and little bit hacky it sets structures to cop
	 */
	$scope.populateLd = function () {
		for(var i=0; i<$scope.ldData.length; i++) {
			$scope.ldData[i].description = this.getLdDescription(i);
		}

		$scope.ldData[$scope.DETAILS].hasStructure = true;
		$scope.ldData[$scope.DETAILS].structure = "title: "+
												  "\nclass: "+
												  "\nlocation: "+
												  "\nlearning aim: "+
												  "\nduration: "
		;
		$scope.ldData[$scope.TIME_BOXING].hasStructure = true;
		$scope.ldData[$scope.TIME_BOXING].structure = 	"launch: "+
														"\nactivity: "+
												  		"\nlanding: "
		;




		this.loadLDbyIndex($scope.loadedIndex);
	}
	/**
	 * @param indexToShow takes a int index of the LD that is to be edited
     */
	$scope.loadLDbyIndex = function(indexToShow) {
		location.hash = "#editNoteAnchor";

		$scope.loadedIndex 			= indexToShow;
		$scope.ldLoadedTitle		= $scope.ldData[$scope.loadedIndex].title;
		$scope.ldLoadedDescription 	= $scope.ldData[$scope.loadedIndex].description;
		$scope.loadedNote 			= $scope.findById($scope.ldData[$scope.loadedIndex].id);

		if( $scope.loadedNote === null ) {
			$scope.hasControl	= false;
			$scope.textEntry = '';
		}else{
			$scope.hasControl	= $scope.loadedNote.hasControl;
			$scope.textEntry 	= $scope.loadedNote.text;
		}
	};

	/**
	 * @param id this is a two char abreviation of an LD
     */
	$scope.loadLdById = function(id) {
		location.hash = "#editNoteAnchor";

		$scope.collapsed = 1;
		$scope.loadedIndex 			= $scope.getIndexFromId(id);
		$scope.ldLoadedTitle		= $scope.ldData[$scope.loadedIndex].title;
		$scope.ldLoadedDescription 	= $scope.ldData[$scope.loadedIndex].description;
		$scope.loadedNote 			= $scope.findById($scope.ldData[$scope.loadedIndex].id);

		if( $scope.loadedNote === null ) {
			$scope.hasControl	= false;
			$scope.textEntry = '';
		}else{
			$scope.hasControl	= $scope.loadedNote.hasControl;
			$scope.textEntry = $scope.loadedNote.text;
		}
	};

	$scope.appendStructure = function() {
		$scope.textEntry += $scope.ldData[$scope.loadedIndex].structure;
	}

	$scope.getIndexFromId = function(id) {
		for( var i=0; i<$scope.ldData.length;i++){
			if( $scope.ldData[i].id == id ){
				return $scope.ldData[i].index;
			}
		}
		return null;
	};

	/**
	 * @param ldData id a two char abreviation of the LD
	 * @return the ld if found or null if not found
	 **/
	$scope.findById = function(id) {
		for( var i=0; i<$scope.localStorageArray.length;i++){
			if( $scope.localStorageArray[i].id == id ){
				return $scope.localStorageArray[i];
			}
		}
		return null;
	};

    $scope.addNote = function() {
		var ldId = $scope.ldData[$scope.loadedIndex].id;
		var ldName = $scope.ldData[$scope.loadedIndex].title;

		if( $scope.findById(ldId) !== null ) {
			$scope.editNote(ldId,$scope.textEntry,$scope.hasControl);
		}else{
			$scope.localStorageArray.push( {id: ldId, ldName: ldName, text: $scope.textEntry, hasControl: $scope.hasControl} );
		}
		localStorage.setItem(scope.localStoreName, JSON.stringify($scope.localStorageArray));
		$scope.localStorageArray = JSON.parse(localStorage.getItem(scope.localStoreName));
    };

	/**
	 * pulls the current localStorage for example and stores it in localStorageArray
	 */
	$scope.refreash = function() {
        $scope.localStorageArray = JSON.parse(localStorage.getItem(scope.localStoreName));
	};

	/**
	 * re sets the local storge
	 */
    $scope.reset = function() {
        localStorage.removeItem(scope.localStoreName);
        $scope.localStorageArray = [];
    };

	/**
	 * @param	id 			is a two char abreviation of the LD
	 * @param	newText		is a two char abreviation of the LD
	 *
	 * This function will update the loaded copy of JSON array and then push it to local storage
	 * and also call refresh incase the arry is bound to a table
	 **/
    $scope.editNote = function(id,newText,hasControl) {
		for( var i=0; i<$scope.localStorageArray.length; i++){
			if( $scope.localStorageArray[i].id == id ){
				$scope.localStorageArray[i].text =  newText;
				$scope.localStorageArray[i].hasControl =  hasControl;

			}
		}

        localStorage.setItem(scope.localStoreName, JSON.stringify($scope.localStorageArray));
	   	this.refreash();
    };


    /*	this is pretty ugly but this is how the descriptions are currently loaded :(
    * 	sorry future me
    *
    * */

	$scope.getLdDescription = function(ldIndex) {
		switch(ldIndex){
			case $scope.CLOSED_VERSUS_OPEN:
				return $scope.CLOSED_VERSUS_OPEN_DSC;
			case $scope.RECOGNITION:
				return $scope.RECOGNITION_DSC;
			case $scope.TIME_BOXING :
				return $scope.TIME_BOXING_DSC;
			case $scope.CULTURAL_RELEVANCE:
				return $scope.CULTURAL_RELEVANCE_DSC;
			case $scope.RISK_AND_REWARD:
				return $scope.RISK_AND_REWARD_DSC;
			case $scope.DRIVER_SHIFTING:
				return $scope.DRIVER_SHIFTING_DSC;
			case $scope.GROUPING	:
				return $scope.GROUPING_DSC;
			case $scope.SESSION_SHAPE:
				return $scope.SESSION_SHAPE_DSC;
			case $scope.DETAILS:
				return $scope.DETAILS_DSC;
		}
	};

	$scope.CLOSED_VERSUS_OPEN_DSC = "Learning experience can be designed to contain a number of tasks or activities. The Closed versus Open dimension encapsulates the extent to which these activities have a well-defined structure and end-point. A good example of a closed problem is programming a robot to follow a given line. The task defines the answer: there is little scope for the learner take ownership. At the open end of the dimension would be a free choice activity where learners are able to demonstrate competency in a given skill through the creation of a piece of work that is not constrained by the educator, for example by creating a robot dance.\n"

		+ "\n+Closed problems"
		+ "\n|-give a safe space for new skill to be consolidated"
		+ "\n|-may loose the interest of more advanced learners"
		+ "\n"

		+ "\n+Open problems"
		+ "\n|-give freedom to more advanced learners"
		+ "\n|-may be intimidating to less confidant learners"
		+ "\n|-may be more challenging to support (facilitation vs teaching)"
		+ "\n"



	;

		$scope.RECOGNITION_DSC = "It is typical for a learning experiences to result in the generation of a product. It may be a program, a sketch or a concept. The recognition dimension considers the potential for the learner to share the product of their learning. As early as nursery school, learners seek recognition from their teachers, peers and parents. A good example of this is pleasure gained from the displaying of work on the walls of the learning environment for all to see. This model of recognition has three parts: (a) the mode of the interaction; (b) the audience size and (c) the response or result. Each of these, when considered together, will have an effect on the learner’s engagement and motivation. \n"
		+ "\n+Low recognition"
		+ "\n|-missed oppertunity for intrinsic motivation"
		+ "\n|-less distracting"
		+ "\n"


		+ "\n+High recognition:"
		+ "\n|-learn from peers approach to problem"
		+ "\n|-drives intrinsic motivation"
		+ "\n|-large audience can be reached with online communities [sratch]"
		+ "\n|-peer group are an interested audiance"
		+ "\n"
		;

	$scope.TIME_BOXING_DSC ="The Time Boxing dimension seeks to break down the traditional view of a teacher-learner relationship. It encapsulates the extent to which a learning experience offers and encourages learners to independently explore, experiment and iterate over aspects of the learning experience.  This idea is rooted in constructivist learning theory (Papert and Harel, 1991): learning takes place best when learners engage in project work that results in an artefact that is relevant to the learners further described in the Cultural Relevance LD. Time Boxing, however, addresses the fact that space and independence may be intimidating for certain learners. Furthermore, it acknowledges the tension between the learner as an individual  and a need to cover a particular amount of content with a group of learners. Where space can be intimidating, direction, constraint and facilitation can be catalysts to creativity and learning.\n"
		+ "\n+Key stages"
		+ "\n|-focal launch: bring the group together define the task well, answer questions "
		+ "\n|-activity: set a visible timer and let the activity run"
		+ "\n|-focal landing: bring the group together and teases out what was learned, where were the differences"
		+ "\n"

		+ "\n+Low time boxing"
		+ "\n|-single uninterupted activity"
		+ "\n|-greater teacher controll"
		+ "\n"


		+ "\n+High time boxing:"
		+ "\n|-give space for independant or group discovery and consolidation"
		+ "\n|-encourages and nurture learner autonomy"
		+ "\n|-can expose different solutions to the same problem"
		+ "\n"
	;
	$scope.CULTURAL_RELEVANCE_DSC =	"Often part of a learning experience involves creating a product of some kind, such as code or a sketch. The Cultural Relevance dimension considers where this product sits within the learner’s culture. It prompts consideration of whether or not the tasks they are engaged in authentic and relevant to their daily life experience. Ownership, personalisation and purpose are key aspects of creating a learning experience that will have high cultural relevance for the learner. If the learning experience is divorced from the world the learner inhabits, the cultural relevance will be low.\n"
		+ "\n+Low cultural relevance"
		+ "\n|-"
		+ "\n"


		+ "\n+High cultural relevance:"
		+ "\n|-"
		+ "\n"
	;
	$scope.RISK_AND_REWARD_DSC ="The risk reward cycle considers the relationship between the investment of effort or risk that a learner undertakes and the reward when feedback is received. Investment of effort without confirmation that the correct actions are been taken by the learner are considered a risk. This is because they may result in wasted effort or even worse enforcing an incorrect understanding or application of a skill.\nFeedback can take a number of forms, such as observation and direction from a teacher or the completion of a complete program that can be executed. For example, this could be the time taken to write a hello world program. For Java, the amount of effort investment required from the learner to get the payback or reward of some text being displayed is non-trivial. In a language like Processing, the effort investment made by the learner before observable outcome is much shorter. In Processing and other scripting languages, it is possible to render output in one line of code. This programming effort is considered a risk to a learner, as when they move independently in a direction for a given period time before feedback is offered there is a chance they are moving in the wrong direction. In any learning experience, there will be a cycle of learner effort investment and pay off as the learner works through different tasks and received feedback as they progress.\n"
		+ "\nLow risk and reward (large chunk of work between feedback events)"
		+ "\n|-better for more independent learners"
		+ "\n|-may "
		+ "\n"


		+ "\n+High risk and reward:(frequent feedback)"
		+ "\n|-incorrect knowledge or skills will be caught quickly"
		+ "\n|-learner confidance will be bolstered"
		+ "\n|-regular interaction will encourage dialog with learners"
		+ "\n|-may be disruptive in some circumstances"
		+ "\n"
	;
	$scope.DRIVER_SHIFTING_DSC = "Driver shift is a new concept that has emerged from the studies conducted. This dimension attempts to capture which actors in the learning experience are driving, i.e. taking control of the learning experience at a given point in time. It is likely that there will be transitions between learners and facilitators as drivers throughout a session.  There can also include a mid-state in which collaboration between the learner and the teacher takes place. For example, a classic higher education style lecture where the lecturer projects content to the learners for a sustained period would be regarded to have very low degree of driver shift. In contrast, a guided practical with a tight cycle, in which learners are shown a brief example and then given space to try it, would be said to have a high degree of driver shift. This can be represented as a time series graph with the three different driver states depicted via the y-axis and time progressing via the x-axis \n"
		+ "\n+Low driver shifting"
		+ "\n|-requires longer attention span in learner"
		+ "\n|-allow lots of material to be covered"
		+ "\n|-affords high degree of focus on single task"
		+ "\n"


		+ "\n+High driver shifting:"
		+ "\n|-allows learners to try thing quickly"
		+ "\n|-creates a potentialy desirable creative disruption"
		+ "\n|-removes the risk of long taught session being wasted by early points not understood"
		+ "\n"
	;
	$scope.GROUPING_DSC ="The group dimension draws attention to the different arrangements of learners that are possible. Throughout the studies conducted, three natural groupings of learners were noted: individuals, pairs, and groups of more than two people.  In addition, there have been situations where there have been asymmetric groups in which learners worked with parents or with learners of different abilities. The group dimension considers grouping at the following four levels: (1) individual, (2) pair, (3) team and (4) asymmetric collaboration.  \n"
		+ "\nIndividual"
		+ "\n|-(+) must engage in all the material"
		+ "\n|-(+) no overhead of group communication, collaboration"
		+ "\n|-(-) it is easy to get stuck on your own"
		+ "\n|-(-) hard to be creative in a vacume"
		+ "\n"

		+ "\nPair:"
		+ "\n|-(+) allows collaborative reasoning"
		+ "\n|-(-) possile to 'freeload'"
		+ "\n"

		+ "\nTeam:"
		+ "\n|-(+) lots of ideas to bounce around"
		+ "\n|-(+) possible to generate bigger projects"
		+ "\n|-(+) matches the real world"
		+ "\n|-(-) significant overhead of communication"
		+ "\n|-(-) peronalaties clashs may impede work"
		+ "\n"

		+ "\nAsymmetric collaboration :"
		+ "\n|-(+) differently benafition to each part of the partnership"
		+ "\n|-(+) can be different ability or dicipline"
		+ "\n|-(-) communication challenges "
		+ "\n"
	;
	$scope.SESSION_SHAPE_DSC ="The physical environment encapsulates all elements of the space that learning takes place, including aspects such as the arrangement of tables and location of supporting visuals such as white boards or projectors. The physical environment is an important aspect of a learning experience. Currently as learners progress through nursery school, primary school, secondary school and on to Further and Higher Education, there is a notable shift in learning space design, from a flexible open activity specific space to the increasingly closed transmission-centred lecture theatre design. This correlates with a trend of increasing learner to teacher ratio and a perceived increased ‘efficiency’. As learners mature and their attention span increases, the ability to consume and assimilate lectures increases.  However there is a growing consensus [] that active learning is a powerful tool to engage learners and the use and design of learning space must reflect this. The physical environments involved in the studies and therefore reflected upon here are classroom, public space, computing lab and informal learning space. \n"
		+ "\n+Low session shape"
		+ "\n|-"
		+ "\n"


		+ "\n+High session shape:"
		+ "\n|-"
		+ "\n"
	;

	$scope.DETAILS_DSC ="Use this section to store any other information related to your learning experiance.\n"
	+ "\n- title"
	+ "\n- class"
	+ "\n- learning aim"
	+ "\n- duration";

}
