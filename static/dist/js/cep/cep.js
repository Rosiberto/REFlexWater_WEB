function init() {
    
		var $ = go.GraphObject.make;
	  
		myDiagram = $(go.Diagram, "myDiagramDiv", {
					"LinkDrawn": showLinkLabel,
					"LinkRelinked": showLinkLabel,
					"undoManager.isEnabled": true,	padding: 20,
					grid: $(go.Panel, "Grid",
						  $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
						  $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 })
					)});
		  
		myDiagram.addDiagramListener("Modified", function(e) {
        var button = document.getElementById("SaveButton");
        if (button) button.disabled = !myDiagram.isModified;
        var idx = document.title.indexOf("*");
        if (myDiagram.isModified) {
          if (idx < 0) document.title += "*";
        } else {
          if (idx >= 0) document.title = document.title.substr(0, idx);
        }
      });

      function nodeStyle() {
        return [
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          {
            locationSpot: go.Spot.Center
          }
        ];
      }

      function makePort(name, align, spot, output, input) {
        var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
        return $(go.Shape,
          {
            fill: "transparent",
            strokeWidth: 0,
            width: horizontal ? NaN : 8,
            height: !horizontal ? NaN : 8,
            alignment: align,
            stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
            portId: name,  
            fromSpot: spot,
            fromLinkable: output,
            toSpot: spot,
            toLinkable: input,
            cursor: "pointer",
            mouseEnter: function(e, port) {
              if (!e.diagram.isReadOnly) port.fill = "rgba(255,0,255,0.5)";
            },
            mouseLeave: function(e, port) {
              port.fill = "transparent";
            }
          });
      }

      function textStyle() {
        return {
          font: "bold 11pt Lato, Helvetica, Arial, sans-serif",
          stroke: "#000000"//#F8F8F8
        }
      }

      myDiagram.nodeTemplateMap.add("Condition",
        $(go.Node, "Table", nodeStyle(),
          $(go.Panel, "Auto",
            $(go.Shape, "Diamond",
              { desiredSize: new go.Size(60, 60), fill: "#FFF0F5", stroke: "#FFB6C1", strokeWidth: 3.5 },
              new go.Binding("figure", "figure")),
            $(go.TextBlock, textStyle(),
              {
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true,
				isMultiline : false
              },
              new go.Binding("text").makeTwoWay())
          ),
			makePort("T", go.Spot.Top, go.Spot.Top, false, true),
			makePort("L", go.Spot.Left, go.Spot.Left, true, true),
			makePort("R", go.Spot.Right, go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
        ));
      
      myDiagram.nodeTemplateMap.add("And",
        $(go.Node, "Table", nodeStyle(),
          $(go.Panel, "Spot",
            $(go.Shape, "Circle",
              { desiredSize: new go.Size(60, 60), fill: "#FAF0E6", stroke: "#DC3C00", strokeWidth: 3.5 }),
            $(go.TextBlock, textStyle(),
              new go.Binding("text"),
			  {editable: false, isMultiline : false})
          ),
            makePort("T", go.Spot.Top, go.Spot.Top, false, true),
			makePort("L", go.Spot.Left, go.Spot.Left, false, true),
			makePort("R", go.Spot.Right, go.Spot.Right, true, true),
			makePort("B", go.Spot.Bottom, go.Spot.Bottom, false, true)
        ));
		
		myDiagram.nodeTemplateMap.add("Attribute",
        $(go.Node, "Table", nodeStyle(),
			$(go.Panel, "Auto",
				$(go.Shape, "Border",
            { desiredSize: new go.Size(NaN, 60), fill: "#D8BFD8", stroke: "#4B0082", strokeWidth: 3 },
			new go.Binding("figure", "figure")),
          $(go.TextBlock, textStyle(),
            {
              margin: 8,
              maxSize: new go.Size(160, NaN),
              wrap: go.TextBlock.WrapFit,
              textAlign: "center",
              editable: true,
			  isMultiline : false
            },
				new go.Binding("text").makeTwoWay())
			),
			makePort("T", go.Spot.Top, go.Spot.TopSide, true, false),
			makePort("R", go.Spot.Right, go.Spot.RightSide, true, false),
			makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false)
        ));

	//Circle - Pentagon - Rectangle - RoundedRectangle - Diamond - Border
	//Parallelogram - Trapezoid - ManualOperation - Hexagon - Heptagon
	//Octagon - Nonagon - Decagon - Dodecagon - Square - Cylinder4 - DataBase
	//Document - DividedEvent
		
      myDiagram.nodeTemplateMap.add("Event",
        $(go.Node, "Table", nodeStyle(),
			$(go.Panel, "Auto",
				$(go.Shape, "RoundedRectangle", //fill: "#FFFFE0", stroke: "#D2691E",
            { desiredSize: new go.Size(NaN, 40),fill: "#F5FFFA", stroke: "#09d3ac", strokeWidth: 3 },
			new go.Binding("figure", "figure")),
          $(go.TextBlock, textStyle(),
            {
              margin: 8,
              maxSize: new go.Size(160, NaN),
              wrap: go.TextBlock.WrapFit,
              textAlign: "center",
              editable: true,
			  isMultiline : false
            },
				new go.Binding("text").makeTwoWay())
			),
            makePort("T", go.Spot.Top, go.Spot.TopSide, true, true),
			makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
			makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
			makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false)
        ));

		myDiagram.nodeTemplateMap.add("Timer",
        $(go.Node, "Table", nodeStyle(),
			$(go.Panel, "Auto",
				$(go.Shape, "BpmnEventTimer",
            { desiredSize: new go.Size(NaN, 40),fill: "#FFFAFA", stroke: "#EEE8AA", strokeWidth: 3 },
			new go.Binding("figure", "figure")),
          $(go.TextBlock, textStyle(),
            {
              margin: 8,
              maxSize: new go.Size(160, NaN),
              wrap: go.TextBlock.WrapFit,
              textAlign: "center",
              editable: true,
			  isMultiline : false
            },
				new go.Binding("text").makeTwoWay())
			),
            makePort("T", go.Spot.Top, go.Spot.TopSide, true, true),
			makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
			makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
			makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false)
        ));
		
      myDiagram.linkTemplate =
        $(go.Link,{
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 5, toShortLength: 4,
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true,
            resegmentable: true,
            mouseEnter: function(e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
            mouseLeave: function(e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; },
            selectionAdorned: false
          },
          new go.Binding("points").makeTwoWay(),
          $(go.Shape,  
            { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" }),
          $(go.Shape, 
            { isPanelMain: true, stroke: "gray", strokeWidth: 2 },
            new go.Binding("stroke", "isSelected", function(sel) { return sel ? "dodgerblue" : "gray"; }).ofObject()),
          $(go.Shape, 
            { toArrow: "standard", strokeWidth: 0, fill: "gray" }),
          $(go.Panel, "Auto", 
            { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5 },
            new go.Binding("visible", "visible").makeTwoWay(),
            $(go.Shape, "RoundedRectangle",
              { fill: "#F8F8F8", strokeWidth: 0 }),
            $(go.TextBlock, "yes",
              {
                textAlign: "center",
                font: "10pt helvetica, arial, sans-serif",
                stroke: "#333333",
                editable: true
              },
              new go.Binding("text").makeTwoWay())
          )
        );

      function showLinkLabel(e) {
        var label = e.subject.findObject("LABEL");
        if (label !== null) label.visible = (e.subject.fromNode.data.category === "Condition");
      }

      myDiagram.toolManager.linkingTool.temporaryLink.routing   = go.Link.Orthogonal;
      myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

      load();
	  
      myPalette =
        $(go.Palette, "myPaletteDiv",
          {
            "animationManager.initialAnimationStyle": go.AnimationManager.None,
            "InitialAnimationStarting": animateFadeDown, 
            nodeTemplateMap: myDiagram.nodeTemplateMap,
            model: new go.GraphLinksModel([
              { category: "Attribute", text: "Attribute" },
			  { category: "Condition", text: "?" },
			  { category: "Event", text: "Event" },
			  { category: "And", text: "and" },
              { category: "Timer", text: "Timer" }
            ])
          });

      function animateFadeDown(e) {
        var diagram = e.diagram;
        var animation = new go.Animation();
        animation.isViewportUnconstrained = true;
        animation.easing = go.Animation.EaseOutExpo;
        animation.duration = 900;
        animation.add(diagram, 'position', diagram.position.copy().offset(0, 200),diagram.position);
        animation.add(diagram, 'opacity', 0, 1);
        animation.start();
      }
    } // end init
	
    
    function save(action) {
      document.getElementById("mySavedModel").value = myDiagram.model.toJson();
	  myDiagram.isModified = false;
	  
	  defaultModel = myDiagram.model.toJson();
	/*  
	  var titulo = prompt("Nome: ","");
	  
	  let blob = new Blob([defaultModel], { type: "text/plain;charset=utf-8" });
	  saveAs(blob, titulo + ".diagram");
	  //localStorage.setItem(n,defaultModel);
	  
	  */
	}

    function load(event) {
		var fileList = document.getElementById("input");
		var reader   = new FileReader();
		
/*		fileList.onchange = function() {
			const file = fileList.files[0];
			reader.readAsText(file);
		};
*/
		reader.onload = function(loadedEvent) {
        	console.log(loadedEvent.target.result);
			document.getElementById("mySavedModel").value = loadedEvent.target.result;
			myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
		}
    }
	
    function createRule(){
		var epl, epl_select, epl_event, epl_condition, 
			epl_timer, ini_rule_name, fim_rule_name, as, 
			id, nameRule, tipo, ini_from_pattern, 
			fim_from_pattern, cast,	json_text_select,
			json, json_name, json_text, json_action, 
			json_actionType, json_actionTemplate, 
			json_actionTemplate_text, json_actionParameters, 
			json_action_fromEmail, json_action_toEmail, 
			json_action_subject, json_time, json_time_fim, 
			meio_from_pattern, fecha_chave, attribute_text, 
			key_attribute, key_condition, condition_text,
			key_event, event_text, comboTipo, comboAction, 
			key_timer, timer_text, severitTipo,typeAction, 
			json_url, json_headers, json_json_ini, 
			json_json_message_ini;
		
					
				json_json_ini = '"json":{"severit":"';
		json_json_message_ini = '"message":"';
				 json_headers = '"headers":{"Content-type": "application/json"},';
					 json_url = '"url":"/api/v2/notify",';
					json_text = '","text":';
					json_name = '{"name":"';
				  fecha_chave = '}';
		  json_action_toEmail = '"to":"';
		json_action_fromEmail = '"from":"';
				  json_action = ', "action":{';
			  json_actionType = '"type":"';
		  json_actionTemplate = '"template":\"';
		json_actionParameters = '\", "parameters":{';
		 			 ini_cast = 'cast(cast(';
					 fim_cast = '?,String),float)';
						   id = 'id';
						   as = '? as ';
			 json_text_select = '"select *,ev.';
				ini_rule_name = ", \\\"";
				fim_rule_name = "\\\" as ruleName ";
			 ini_from_pattern = "from pattern [every ev=iotEvent(";
			meio_from_pattern = " and type=\\\"";
			 fim_from_pattern = "\\\")]";				
					json_time = '.win:time(';
				json_time_fim = ' minute)"';
				
		   		
		
		//comboTipo = document.getElementById("tipo");			
		//tipo 	  = comboTipo.options[comboTipo.selectedIndex].value;
		tipo 	  = document.getElementById("tipo").value;	
		
		json_action_subject	  	 = '"subject":"' + document.getElementById("notificacao").value + '"';
		
		json_actionTemplate_text = document.getElementById("templateMSG").value;

		nameRule = document.getElementById("nameRule").value;

		//json_actionType = json_actionType + document.getElementById("typeAction").value + '",';
		typeAction = document.getElementById("typeAction").value;
		json_actionType = json_actionType + typeAction;
		
		
		json_action_fromEmail = json_action_fromEmail + document.getElementById("fromEmail").value+ '",';

		json_action_toEmail = json_action_toEmail + document.getElementById("toEmail").value + '",';
		
		severitTipo = document.getElementById("severit").value;
		
		
		
		for(var a in myDiagram.model.nodeDataArray ){
			if (myDiagram.model.nodeDataArray[a].category == "Attribute"){
				key_attribute  = myDiagram.model.nodeDataArray[a].key;
				attribute_text = myDiagram.model.nodeDataArray[a].text;	
					
				epl_select = json_text_select + attribute_text   + as + id  +
							 attribute_text   + ini_rule_name    + nameRule + fim_rule_name  + ini_from_pattern + ini_cast + attribute_text + fim_cast;	
				
			}else if (myDiagram.model.nodeDataArray[a].category == "Condition"){
				key_condition  = myDiagram.model.nodeDataArray[a].key;
				condition_text = myDiagram.model.nodeDataArray[a].text;

				epl_condition = condition_text + meio_from_pattern + 
								tipo + fim_from_pattern;
			
			}else if (myDiagram.model.nodeDataArray[a].category == "Timer"){
				key_timer  = myDiagram.model.nodeDataArray[a].key; 
				timer_text = myDiagram.model.nodeDataArray[a].text;
				
				epl_timer = json_time + timer_text + json_time_fim;
				
			}else if (myDiagram.model.nodeDataArray[a].category == "Event"){
				key_event  = myDiagram.model.nodeDataArray[a].key; 
				event_text = myDiagram.model.nodeDataArray[a].text;
			}			
		}			
		   
		if (epl_timer == null ){
			epl = epl_select + epl_condition + '"';
		}else{
			epl = epl_select + epl_condition + epl_timer;
		}
		
		json =  json_name + nameRule + json_text + epl + 
				json_action + json_actionType + json_actionTemplate + 
				json_actionTemplate_text + " "+ event_text + 
				' = ${'+ attribute_text +'}' + json_actionParameters + json_action_toEmail + json_action_fromEmail + 
				json_action_subject + fecha_chave + fecha_chave + fecha_chave;

				
		if (typeAction == "email"){
	
			json = 	json_name + nameRule + json_text + epl + 
					json_action + json_actionType + json_actionTemplate + 
					json_actionTemplate_text + " "+ event_text + 
					' = ${'+ attribute_text +'}' + json_actionParameters + json_action_toEmail + json_action_fromEmail + 
					json_action_subject + fecha_chave + fecha_chave + fecha_chave;
		}else{
			json = 	json_name + nameRule + json_text + epl + 
					json_action + json_actionType + json_actionParameters + 
					json_url + json_headers +
					json_json_ini + severitTipo + '",' + 
					json_json_message_ini + json_actionTemplate_text + " "+ 
					event_text + ' = ${'+ attribute_text + fecha_chave + '"' +			
					fecha_chave + fecha_chave + fecha_chave + fecha_chave;		
		}
		
		postRule( json );//envia regra p/mongoDB			
	}
	
	function disabledEmail(){
		document.getElementById("typeAction").onchange=function(){
			document.getElementById("toEmail").disabled=false
			if(this.selectedIndex==2){
				document.getElementById("toEmail").value="";
				return document.getElementById("toEmail").disabled=true;
			}
		}
	}
	
	
	
	function postRule(rule){
		$.ajax({
			url : "api/v1/rules",
			type: "POST",
			data: rule
		}).done( function( response ){
			//$('#registerForm')[0].reset();//limpa todos os campos do form
			toastr.success('Regra criada com sucesso!');
		}).fail(function() {
			toastr.error('Falha na criação da Regra!');
		});
	}
	
	
	function listEvent(){
	  var i, 
		txt = "";
		
		$.ajax({
			url : "/api/v1/rules",
			type: "GET",
			contentType:"application/json; charset=utf-8"			
		}).done( function( response ){
			txt += "<table class='table table-striped'>"
			txt += "<thead>"
            txt += "<tr> <th style='width: 30%'>Nome</th> "
			txt += "<th style='width: 40%'>Regra</th>"
			txt += "<th style='width: 10%'>Ação</th> <th style='width: 20%'></th></tr>"
			txt += "</thead>"
			txt += "<tbody>"
			
			for (i=0; i < response.data.length; i++) {
				txt += "<tr><td>" + response.data[i].name + "</td>";
				txt += "<td>" + response.data[i].text + "</td>";
				txt += "<td>" + response.data[i].action.type + "</td>";
				txt += "<td class='project-actions text-right'>"
                txt += "<a id='abrir' class='btn btn-primary btn-sm' href='#'>"
				txt += "<i class='fas fa-folder'></i></a>"
                txt += "<a id='editar' class='btn btn-info btn-sm' href='#'>"
                txt += "<i class='fas fa-pencil-alt'></i></a>"
                txt += "<a id='excluir' class='btn btn-danger btn-sm' href='#'>"
                txt += "<i class='fas fa-trash'></i></a></td></tr>"
			}
				
			txt += "</tbody></table>"
			document.getElementById('evento').innerHTML = txt;
			
		}).fail(function() {
			toastr.error('Falhou!');
		});
    }
    
 
