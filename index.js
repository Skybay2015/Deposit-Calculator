class Main {
    constructor(elem) {
        this.container = elem;
        this.container.addEventListener('mouseover', this.showNotification.bind(this));
        this.container.addEventListener('mouseout', this.hideNotification.bind(this));
        this.notification = new Notification().notification;
        this._showingNotification = null;
        this._currentElement = null;
    }
    _getCords(target) {
        return new Cords(target);
    }
    showNotification(e) {
        let target = e.target;
        if (this._currentElement == target) return;
        if (target.dataset.tooltip) {
            const cords = this._getCords(target);
            const notification = this.notification;
            const tooltip = target.dataset.tooltip;
            notification.textContent = tooltip;
            notification.className = 'tooltip';
            this.container.append(notification);
            notification.style.top = cords.targetCords.top - notification.offsetHeight - 5 + 'px';
            if (notification.getBoundingClientRect().top < 0) {
                notification.style.top = cords.targetCords.top + target.offsetHeight + 5 + 'px';
            }
            notification.style.left = cords.targetCords.left + (target.offsetWidth - notification.offsetWidth) / 2 + 'px';
            this._showingNotification = notification;
            this._currentElement = target;
        }
    }

    hideNotification(e) {
        if (!this._currentElement) return;
        let relatedTarget = e.relatedTarget;
        while (relatedTarget) {
            if (relatedTarget == this._currentElement) return
            relatedTarget = relatedTarget.parentElement;
        }
        console.log(relatedTarget, 'related')
        console.log(this._currentElement, 'current')
        this.container.removeChild(this._showingNotification)
        this._showingNotification = null;
        this._currentElement = null;
    }
}



class Cords {
    constructor(target) {
        this.targetCords = target.getBoundingClientRect();
    }
}

class Notification {
    constructor() {
        this.notification = document.createElement('div');
    }
}

let obj = new Main(document.querySelector('#house'))