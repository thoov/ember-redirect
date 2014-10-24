
export default function(routeName, options) {
    var routeObject;

    this.resourceNameChain.push(routeName);
    routeObject = this.container.lookup('route:' + this.resourceNameChain.join('.'));
    routeReopen(routeObject, options);
    this.resourceNameChain.pop();
}
