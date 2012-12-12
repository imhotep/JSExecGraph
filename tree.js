/**
 * Created by JetBrains RubyMine.
 * User: pavanpodila
 * Date: 7/17/11
 * Time: 4:30 PM
 * To change this template use File | Settings | File Templates.
 */

var xtreeData = {
    name: "Long String",
    root: true,
    contents: [
        {
            name: "Applications",
            contents: [
                { name: "Mail.app" },
                { name: "iPhoto.app" },
                { name: "Keynote.app" },
                { name: "iTunes.app" },
                { name: "XCode.app" },
                { name: "Numbers.app" },
                { name: "Pages.app" }
            ]
        },
        {
            name: "System",
            contents: []
        },
        {
            name: "Library",
            contents: [
                {
                    name: "Application Support",
                    contents: [
                        { name: "Adobe" },
                        { name: "Apple" },
                        { name: "Google" },
                        { name: "Microsoft" }
                    ]
                },
                {
                    name: "Languages",
                    contents: [
                        { name: "Ruby" },
                        { name: "Python" },
                        { name: "Javascript" },
                        { name: "C#" }
                    ]
                },
                {
                    name: "Developer",
                    contents: [
                        { name: "4.2" },
                        { name: "4.3" },
                        { name: "5.0" },
                        { name: "Documentation" }
                    ]
                }
            ]
        },
        {
            name: "opt",
            contents: []
        },
        {
            name: "Users",
            contents: [
                { name: "pavanpodila" },
                { name: "admin" },
                { name: "test-user" }
            ]
        }
    ]
};

var treeDataArray =
[
    {
        name: "click",
        type: "event",
        root: true,
        contents: 
        [
            {
                name: "clickHandler1",
                type: "handler"     
            },
            {
                name: "clickHandler2",
                type: "handler"     
            },
            {
                name: "clickHandler3",
                type: "handler"     
            }
        ]
    },
    {
        name: "click",
        type: "event",
        root: true,
        contents: 
        [
            {
                name: "clickHandler1",
                type: "handler"     
            },
            {
                name: "clickHandler3",
                type: "handler"     
            }
        ]
    },
    {
        name: "click",
        type: "event",
        root: true,
        contents: 
        [
            {
                name: "clickHandler1",
                type: "handler"     
            },
            {
                name: "clickHandler2",
                type: "handler"     
            },
            {
                name: "clickHandler3",
                type: "handler"     
            },
            {
                name: "clickHandler4",
                type: "handler"     
            }
        ]
    },
    {
        name: "click",
        type: "event",
        root: true,
        contents: 
        [
            {
                name: "clickHandler1",
                type: "handler"     
            },
            {
                name: "clickHandler2",
                type: "handler"     
            },
            {
                name: "clickHandler3",
                type: "handler"     
            },
            {
                name: "clickHandler4",
                type: "handler"     
            }
        ]
    },
    {
        name: "click",
        type: "event",
        root: true,
        contents: 
        [
            {
                name: "clickHandler1",
                type: "handler"     
            },
            {
                name: "clickHandler2",
                type: "handler"     
            },
            {
                name: "clickHandler3",
                type: "handler"     
            },
            {
                name: "clickHandler4",
                type: "handler"     
            }
        ]
    },
    {
        name: "click",
        type: "event",
        root: true,
        contents: 
        [
            {
                name: "clickHandler1",
                type: "handler"     
            },
            {
                name: "clickHandler2",
                type: "handler"     
            },
            {
                name: "clickHandler3",
                type: "handler"     
            },
            {
                name: "clickHandler4",
                type: "handler"     
            }
        ]
    },
    {
        name: "click",
        type: "event",
        root: true,
        contents: 
        [
            {
                name: "clickHandler1",
                type: "handler"     
            },
            {
                name: "clickHandler2",
                type: "handler"     
            },
            {
                name: "clickHandler3",
                type: "handler"     
            },
            {
                name: "clickHandler4",
                type: "handler"     
            },
            {
                name: "clickHandler5",
                type: "handler",
                contents: 
                [
                    {
                        name: "clickHandler1",
                        type: "handler"     
                    },
                    {
                        name: "clickHandler2",
                        type: "handler"     
                    },
                    {
                        name: "clickHandler3",
                        type: "handler"     
                    },
                    {
                        name: "clickHandler4",
                        type: "handler"     
                    }
                ]
            }
        ]
    }
];

function visit(parent, visitFn, childrenFn)
{
    if (!parent) return;

    visitFn(parent);

    var children = childrenFn(parent);
    if (children) {
        var count = children.length;
        for (var i = 0; i < count; i++) {
            visit(children[i], visitFn, childrenFn);
        }
    }
}

function buildTrees(treeDataArray, treesContainerName)
{
    for (var i = 0; i < treeDataArray.length; i++) {
        var treeContainerId = "tree-" + i;
        var treeContainer = $('<div class="tree-container"></div>').attr("id", treeContainerId);
        $(treesContainerName).append(treeContainer);
        buildTree(treeDataArray[i], "#" + treeContainerId);
    }
}

function buildTree(treeData, containerName, customOptions)
{
    var childrenName = "nodes";

    if (treeData)
        treeData.root = true;

    // build the options object
    var options = $.extend({
        nodeRadius: 5, fontSize: 12
    }, customOptions);
    
    // Calculate total nodes, max label length
    var totalDepth = 0;
    var totalNodes = 0;
    var maxLabelLength = 0;
    visit(treeData, function(d)
    {
        // Initialize depth at root.
        if (!d.depth)
            d.depth = 0;

        totalNodes++;
        maxLabelLength = Math.max(d.name.length, maxLabelLength);
    }, function(d)
    {
        // Increment depth for children.
        if (d[childrenName]) {
            var childDepth = d.depth + 1;
            for (var i = 0; i < d[childrenName].length; i++)
                d[childrenName][i].depth = childDepth;
            totalDepth = Math.max(totalDepth, childDepth);
        }

        return d[childrenName] && d[childrenName].length > 0 ? d[childrenName] : null;
    });

    // size of the diagram
    var widthPerDepthLevel = maxLabelLength*options.fontSize * 1.5;
    var size = { width: totalDepth * widthPerDepthLevel, height: totalNodes * 15};

    var tree = d3.layout.tree()
        .sort(null)
        .size([size.height, size.width - maxLabelLength*options.fontSize])
        .children(function(d)
        {
            return (!d[childrenName] || d[childrenName].length === 0) ? null : d[childrenName];
        });

    var nodes = tree.nodes(treeData);
    var links = tree.links(nodes);

    
    /*
        <svg>
            <g class="container" />
        </svg>
     */
    var layoutRoot = d3.select(containerName)
        .append("svg:svg").attr("width", size.width).attr("height", size.height)
        .append("svg:g")
        .attr("class", "container")
        .attr("transform", "translate(" + maxLabelLength + ",0)");


    // Edges between nodes as a <path class="link" />
    var link = d3.svg.diagonal()
        .projection(function(d)
        {
            return [d.y, d.x];
        });

    layoutRoot.selectAll("path.link")
        .data(links)
        .enter()
        .append("svg:path")
        .attr("class", "link")
        .attr("d", link);


    /*
        Nodes as
        <g class="node">
            <circle class="node-dot" />
            <text />
        </g>
     */
    var nodeGroup = layoutRoot.selectAll("g.node")
        .data(nodes)
        .enter()
        .append("svg:g")
        .attr("class", function(d)
        {
            return "node node-" + d.type ;
        })
        .attr("transform", function(d)
        {
            return "translate(" + d.y + "," + d.x + ")";
        });

    nodeGroup.append("svg:circle")
        .attr("class", "node-dot")
        .attr("r", options.nodeRadius);

    nodeGroup.append("svg:text")
        .attr("text-anchor", function(d)
        {
            return d.children && !d.root ? "end" : "start";
        })
        .attr("dx", function(d)
        {
            var gap = 2 * options.nodeRadius;
            return d.children && !d.root ? -gap : gap;
        })
        .attr("dy", 3)
        .text(function(d)
        {
            return d.name;
        });

}