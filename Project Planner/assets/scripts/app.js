class DOMHelper {
    // This class is made for outsourcing Dom Node Operations

    static clearEventListners(element) {
        // It will deep Clone ,Replace and Remove any event listners Data it previously had
        const clonedElement = element.cloneNode(true);
        element.replaceWith(clonedElement);
        return clonedElement;
    }

    static moveElement(elementId, newDestinationSelector) {
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(
            newDestinationSelector
        );
        // Append will move the element if it is already present in the dom and not copy it
        destinationElement.append(element);

        //Scroll to or scroll by also support smooth
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

class Component {
    constructor(hostElementId, insertBefore = false) {
        if (hostElementId) {
            this.hostElement = document.getElementById(hostElementId);
        } else {
            this.hostElement = document.body;
        }
        this.insertBefore = insertBefore;
    }
    detach = () => {
        if (this.element) {
            this.element.remove();
            // this.element.parentElement.removeChild(this.element);
        }
    };

    show() {
        // document.body.append(this.element);
        this.hostElement.insertAdjacentElement(
            this.insertBefore ? 'afterbegin' : 'beforeend',
            this.element
        );
    }
}

class Tooltip extends Component {
    constructor(closeNotifierFunction, extraInfo, hostElementId) {
        super(hostElementId);
        this.closeNotifier = closeNotifierFunction;
        this.text = extraInfo;
        this.render();
    }
    closeTooltip = () => {
        this.detach();
        this.closeNotifier();
    };

    render() {
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'card';
        //tooltipElement.textContent = this.text;

        //This will give us acess to template that is in Html
        const toolTipTemplate = document.getElementById('tooltip');
        //It will give us content of template ie: h2 and p tag
        const toolTipBody = document.importNode(toolTipTemplate.content, true);
        toolTipBody.querySelector('p').textContent = this.text;

        tooltipElement.append(toolTipBody);

        console.log(this.hostElement.getBoundingClientRect());

        //Pos from 0,0 to the left Most point of our Element
        // With these Two we get X and Y co ordinates of our Element
        const hostElPosLeft = this.hostElement.offsetLeft;
        const hostElPosTop = this.hostElement.offsetTop;
        //To Help us Better Postion the toolTip
        //Client Height is used to get HEight of the content , offset aslo could be used but we have no borders
        const hostElPosHeight = this.hostElement.clientHeight;
        //Parent Elment to select the Container
        const parentElemntScrolling = this.hostElement.parentElement.scrollTop;

        //The Values which we will work here will always be pixels since we fetch them as pixels even though they are styled with Rem
        //These are read-only Values
        const x = hostElPosLeft + 20;
        const y = hostElPosTop + hostElPosHeight - parentElemntScrolling - 10;

        //Wrting Px is Mandatory For It to Work

        tooltipElement.style.position = 'absolute';
        tooltipElement.style.left = x + 'px';
        tooltipElement.style.top = y + 'px';

        tooltipElement.addEventListener('click', this.closeTooltip);
        this.element = tooltipElement;
    }
}

class ProjectItem {
    hasActiveToolTip = false;
    // This class Will manage individual element`s DOM Nodes
    constructor(id, updateProjectListsFunction, type) {
        // To save ID that we are geting as parameter in a instance
        this.id = id;
        this.updateProjectListsHandler = updateProjectListsFunction;

        this.connectMoreInfoButton();
        this.connectSwitchButton(type);
        this.connectDrag();
    }

    showMoreInfoHandler() {
        if (this.hasActiveToolTip) {
            return;
        }
        const projectElement = document.getElementById(this.id);
        const tooltipText = projectElement.dataset.extraInfo;

        const tooltip = new Tooltip(
            () => {
                this.hasActiveToolTip = false;
            },
            tooltipText,
            this.id
        );
        tooltip.show();
        this.hasActiveToolTip = true;
    }

    connectDrag() {
        document
            .getElementById(this.id)
            .addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text/plain', this.id);
                event.dataTransfer.effectAllowed = 'move';
            });
    }

    connectMoreInfoButton() {
        const projectItemElement = document.getElementById(this.id);
        const moreInfoBtn = projectItemElement.querySelector('button');
        moreInfoBtn.addEventListener(
            'click',
            this.showMoreInfoHandler.bind(this)
        );
    }

    connectSwitchButton(type) {
        const projectItemElement = document.getElementById(this.id);
        // Here last of type is used since there are 2 buttons
        // We use let since we are Deep Cloninng and replacing it
        let switchBtn = projectItemElement.querySelector('button:last-of-type');
        switchBtn = DOMHelper.clearEventListners(switchBtn);

        switchBtn.addEventListener(
            'click',
            this.updateProjectListsHandler.bind(null, this.id)
        );
        switchBtn.textContent = type === 'finished' ? 'Activate' : 'Finish';
    }

    update(updateProjectListsFunction, type) {
        this.updateProjectListsHandler = updateProjectListsFunction;
        //To set new Ev Listner
        this.connectSwitchButton(type);
    }
}

class ProjectList {
    projects = [];

    constructor(type) {
        this.type = type;

        // Query Selector All is used so that we can get the whole list
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        for (const prjItem of prjItems) {
            this.projects.push(
                new ProjectItem(
                    prjItem.id,
                    this.switchProject.bind(this),
                    this.type
                )
            );
        }
        console.log(this.projects);
        this.connectDroppable();
    }
    connectDroppable() {
        const list = document.querySelector(`#${this.type}-projects ul`);

        list.addEventListener('dragenter', (event) => {
            //We cant read the data just type
            if (event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                // Parent will be section
                list.parentElement.classList.add('droppable');
            }
        });
        list.addEventListener('dragover', (event) => {
            if (event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
            }
        });

        list.addEventListener('dragleave', (event) => {
            if (
                event.relatedTarget.closest(`#${this.type}-projects ul`) !==
                list
            ) {
                list.parentElement.classList.remove('droppable');
            }
        });

        list.addEventListener('drop', (event) => {
            // We can get any objects that we passed during DragStart
            // This will retrive the Data
            const prjId = event.dataTransfer.getData('text/plain');
            // To avoid Duplication
            if (this.projects.find((p) => p.id === prjId)) {
                return;
            }
            // We can do complicated way like we did for the swap of active and finsh but here we do a big brain move
            document
                .getElementById(prjId)
                .querySelector('button:last-of-type')
                .click();
            list.parentElement.classList.add('droppable');
            event.preventDefault(); // Not Required0
        });
    }
    setSwitchHandlerFunction(switchHandlerFunction) {
        this.switchHandeler = switchHandlerFunction;
    }

    addProject(project) {
        // It will Add The Project from one instance of Projects Array
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this), this.type);
    }

    switchProject(projectId) {
        // It will Remove The Project from one instance of Projects Array
        // Index OF method wont work because project is an Object
        // Splice Would Also work with combination with IndexOf

        // In this approach it will keep all the items that return to be True

        //Using find we can get the Object with a given Critera
        this.switchHandeler(this.projects.find((p) => p.id === projectId));
        this.projects = this.projects.filter((p) => p.id !== projectId);
    }
}

class App {
    static run() {
        const activeProjectsList = new ProjectList('active');
        const finishedProjectsList = new ProjectList('finished');

        //It wont execute the function just point at it
        // Bind is used as ,If it wont be used it will refer to the one calling
        //It is an example of callback Function
        activeProjectsList.setSwitchHandlerFunction(
            finishedProjectsList.addProject.bind(finishedProjectsList)
        );

        finishedProjectsList.setSwitchHandlerFunction(
            activeProjectsList.addProject.bind(activeProjectsList)
        );
    }
}

App.run();
