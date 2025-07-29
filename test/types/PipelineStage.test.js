"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
/**
 * $addFields:
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/
 */
var addFields1 = {
    $addFields: {
        totalHomework: { $sum: '$homework' },
        totalQuiz: { $sum: '$quiz' }
    }
};
var addFields2 = {
    $addFields: {
        totalScore: { $add: ['$totalHomework', '$totalQuiz', '$extraCredit'] }
    }
};
var addFields3 = {
    $addFields: {
        'specs.fuel_type': 'unleaded'
    }
};
var addFields4 = {
    $addFields: { cats: 20 }
};
var addFields5 = {
    $addFields: {
        _id: '$item',
        item: 'fruit'
    }
};
var addFields6 = {
    $addFields: { homework: { $concatArrays: ['$homework', [7]] } }
};
/**
 * $bucket
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucket/
 */
var bucket1 = {
    $bucket: {
        groupBy: '$year_born', // Field to group by
        boundaries: [1840, 1850, 1860, 1870, 1880], // Boundaries for the buckets
        default: 'Other', // Bucket id for documents which do not fall into a bucket
        output: {
            count: { $sum: 1 },
            artists: {
                $push: {
                    name: { $concat: ['$first_name', ' ', '$last_name'] },
                    year_born: '$year_born'
                }
            }
        }
    }
};
var bucket2 = {
    $facet: {
        price: [
            {
                $bucket: {
                    groupBy: '$price', // Field to group by
                    boundaries: [0, 200, 400], // Boundaries for the buckets
                    default: 'Other', // Bucket id for documents which do not fall into a bucket
                    output: {
                        count: { $sum: 1 },
                        artwork: { $push: { title: '$title', price: '$price' } },
                        averagePrice: { $avg: '$price' }
                    }
                }
            }
        ],
        year: [
            {
                $bucket: {
                    groupBy: '$year', // Field to group by
                    boundaries: [1890, 1910, 1920, 1940], // Boundaries for the buckets
                    default: 'Unknown', // Bucket id for documents which do not fall into a bucket
                    output: {
                        count: { $sum: 1 },
                        artwork: { $push: { title: '$title', year: '$year' } }
                    }
                }
            }
        ]
    }
};
/**
 * $unionWith
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/unionWith/
 */
var unionWith1 = { $unionWith: { coll: 'warehouses', pipeline: [{ $project: { state: 1, _id: 0 } }] } };
var unionWith2 = { $unionWith: { coll: 'sales2019q2', pipeline: [{ $set: { _id: '2019Q2' } }] } };
var unionWith3 = { $unionWith: 'sales2019q2' };
var unionWith4 = { $unionWith: { coll: 'sales2019q2', pipeline: [{ $group: { _id: '$item', total: { $sum: '$quantity' } } }] } };
/**
 * $unset
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/unset/
 */
var unset1 = { $unset: '<field.nestedfield>' };
var unset2 = { $unset: ['isbn', 'copies'] };
var unset3 = { $unset: ['isbn', 'author.first', 'copies.warehouse'] };
/**
 * $unwind
 *
 * @see https://www.mongodb.com/docs/manual/reference/operator/aggregation/unwind/
 */
var unwind1 = { $unwind: '$sizes' };
var unwind2 = { $unwind: { path: '$sizes' } };
var unwind3 = { $unwind: { path: '$sizes', includeArrayIndex: 'arrayIndex' } };
var unwind4 = { $unwind: { path: '$sizes', preserveNullAndEmptyArrays: true } };
var unwind5 = { $unwind: { path: '$sizes', preserveNullAndEmptyArrays: true } };
var redact1 = {
    $redact: {
        $cond: {
            if: { $gt: [{ $size: { $setIntersection: ['$tags', 'userAccess'] } }, 0] },
            then: '$$DESCEND',
            else: '$$PRUNE'
        }
    }
};
var redact2 = {
    $redact: {
        $cond: {
            if: { $eq: ['$level', 5] },
            then: '$$PRUNE',
            else: '$$DESCEND'
        }
    }
};
var replaceRoot = { $replaceRoot: { newRoot: { $mergeObjects: [{ dogs: 0, cats: 0, birds: 0, fish: 0 }, '$pets'] } } };
var project1 = { $project: { contact: 1, 'contact.address.country': 1 } };
var project2 = { $project: { 'contact.address.country': 1, contact: 1 } };
var project3 = { $project: { author: { first: 0 }, lastModified: 0 } };
var project4 = {
    $project: {
        title: 1,
        'author.first': 1,
        'author.last': 1,
        'author.middle': {
            $cond: {
                if: { $eq: ['', '$author.middle'] },
                then: '$$REMOVE',
                else: '$author.middle'
            }
        }
    }
};
var project5 = { $project: { 'stop.title': 1 } };
var project6 = { $project: { stop: { title: 1 } } };
var project7 = {
    $project: {
        title: 1,
        isbn: {
            prefix: { $substr: ['$isbn', 0, 3] },
            group: { $substr: ['$isbn', 3, 2] },
            publisher: { $substr: ['$isbn', 5, 4] },
            title: { $substr: ['$isbn', 9, 3] },
            checkDigit: { $substr: ['$isbn', 12, 1] }
        },
        lastName: '$author.last',
        copiesSold: '$copies'
    }
};
var project8 = { $project: { myArray: ['$x', '$y'] } };
var project9 = { $project: { x: '$name.0', _id: 0 } };
var project10 = { $project: { stdDev: { $stdDevPop: '$scores.score' } } };
var project11 = {
    $project: {
        item: 1,
        comparisonResult: { $strcasecmp: ['$quarter', '13q4'] }
    }
};
var project12 = {
    $project: {
        name: 1,
        length: { $strLenBytes: '$name' }
    }
};
var project13 = {
    $project: {
        name: 1,
        length: { $strLenCP: '$name' }
    }
};
var project14 = {
    $project: {
        item: 1,
        yearSubstring: { $substr: ['$quarter', 0, 2] },
        quarterSubtring: { $substr: ['$quarter', 2, -1] }
    }
};
var project15 = { $project: { item: 1, result: { $not: [{ $gt: ['$qty', 250] }] } } };
var project16 = { $project: { maxScores: { $maxN: { input: '$scores', n: 3 } } } };
var project17 = { $project: { first3Scores: { $firstN: { input: '$scores', n: 3 } } } };
var sort1 = { $sort: { count: -1 } };
var sortByCount1 = { $sortByCount: '$tags' };
var sortByCount2 = { $sortByCount: { $mergeObjects: ['$employee', '$business'] } };
var set1 = { $set: { 'specs.fuel_type': 'unleaded' } };
var set2 = { $set: { cats: 20 } };
var set3 = { $set: { _id: '$item', item: 'fruit' } };
var set4 = { $set: { homework: { $concatArrays: ['$homework', [7]] } } };
var merge1 = { $merge: { into: 'newDailySales201905', on: 'salesDate' } };
var merge2 = { $merge: { into: 'newrestaurants', on: ['date', 'postcode'], whenMatched: 'replace', whenNotMatched: 'insert' } };
var merge3 = { $merge: { into: { db: 'reporting', coll: 'budgets' }, on: '_id', whenMatched: 'replace', whenNotMatched: 'insert' } };
var merge4 = { $merge: { into: { db: 'reporting', coll: 'orgArchive' }, on: ['dept', 'fiscal_year'], whenMatched: 'fail' } };
var merge5 = { $merge: { into: 'quarterlyreport', on: '_id', whenMatched: 'merge', whenNotMatched: 'insert' } };
var merge6 = {
    $merge: {
        into: 'monthlytotals',
        on: '_id',
        whenMatched: [
            {
                $addFields: {
                    thumbsup: { $add: ['$thumbsup', '$$new.thumbsup'] },
                    thumbsdown: { $add: ['$thumbsdown', '$$new.thumbsdown'] }
                }
            }
        ],
        whenNotMatched: 'insert'
    }
};
var match1 = { $match: { $or: [{ score: { $gt: 70, $lt: 90 } }, { views: { $gte: 1000 } }] } };
var match2 = { $match: { test: 'bla' } };
var match3 = { $match: { test: { $or: [{ score: { $gt: 70, $lt: 90 } }, { views: { $gte: 1000 } }] } } };
var match4 = { $match: { $and: [{ score: { $gt: 70, $lt: 90 } }, { views: { $gte: 1000 } }] } };
var match5 = { $match: { test: { $and: [{ score: { $gt: 70, $lt: 90 } }, { views: { $gte: 1000 } }] } } };
var match6 = { $match: { test: true } };
var match7 = { $match: { test: { $ne: true } } };
var addFields7 = { $addFields: { convertedQty: { $toLong: '$qty' } } };
var setWindowFields1 = {
    $setWindowFields: {
        partitionBy: '$state',
        sortBy: { orderDate: 1 },
        output: {
            stdDevPopQuantityForState: {
                $stdDevPop: '$quantity',
                window: {
                    documents: ['unbounded', 'current']
                }
            }
        }
    }
};
var setWindowFields2 = {
    $setWindowFields: {
        partitionBy: '$state',
        sortBy: { orderDate: 1 },
        output: {
            stdDevSampQuantityForState: {
                $stdDevSamp: '$quantity',
                window: {
                    documents: ['unbounded', 'current']
                }
            }
        }
    }
};
var setWindowFields3 = {
    $setWindowFields: {
        partitionBy: '$stock',
        sortBy: { date: 1 },
        output: {
            expMovingAvgForStock: {
                $expMovingAvg: { input: '$price', N: 2 }
            }
        }
    }
};
var setWindowFields4 = {
    $setWindowFields: {
        partitionBy: '$stock',
        sortBy: { date: 1 },
        output: {
            expMovingAvgForStock: {
                $expMovingAvg: { input: '$price', alpha: 0.75 }
            }
        }
    }
};
var setWindowFields5 = {
    $setWindowFields: {
        partitionBy: '$gameId',
        sortBy: { score: 1 },
        output: {
            minScores: {
                $firstN: { input: '$score', n: 3 }
            },
            maxScores: {
                $lastN: { input: '$score', n: 3 }
            }
        }
    }
};
var setWindowFieldsLinearFill = {
    $setWindowFields: {
        partitionBy: '$stock',
        sortBy: { date: 1 },
        output: {
            price: { $linearFill: '$price' }
        }
    }
};
var setWindowFieldsLocf = {
    $setWindowFields: {
        partitionBy: '$stock',
        sortBy: { date: 1 },
        output: {
            price: { $locf: '$price' }
        }
    }
};
var fillWithOutput = {
    $fill: {
        output: {
            bootsSold: { value: 0 }
        }
    }
};
var fillWithPartitionBy = {
    $fill: {
        partitionBy: 'date',
        output: {
            bootsSold: { value: 0 }
        }
    }
};
var fillWithPartitionByFields = {
    $fill: {
        partitionByFields: ['date'],
        output: {
            bootsSold: { value: 0 }
        }
    }
};
var fillWithSortBy = {
    $fill: {
        sortBy: {
            date: -1
        },
        output: {
            bootsSold: { value: 0 }
        }
    }
};
var fillWithOutputMethodLinear = {
    $fill: {
        sortBy: {
            date: -1
        },
        output: {
            bootsSold: { method: 'linear' }
        }
    }
};
var fillWithOutputMethodLocf = {
    $fill: {
        sortBy: {
            date: -1
        },
        output: {
            bootsSold: { method: 'locf' }
        }
    }
};
var group1 = { $group: { _id: null, ageStdDev: { $stdDevSamp: '$age' } } };
var group2 = {
    $group: {
        _id: { x: '$x' },
        y: { $first: '$y' }
    }
};
var group3 = {
    $group: {
        _id: null,
        count: { $count: {} }
    }
};
var group4 = {
    $group: {
        _id: '$item',
        totalSaleAmount: { $sum: { $multiply: ['$price', '$quantity'] } }
    }
};
var group5 = {
    $group: {
        _id: null,
        totalSaleAmount: { $sum: { $multiply: ['$price', '$quantity'] } },
        averageQuantity: { $avg: '$quantity' },
        count: { $sum: 1 }
    }
};
var group6 = { $group: { _id: '$author', books: { $push: '$title' } } };
var group7 = {
    $group: {
        _id: '$gameId',
        topPlayers: {
            $topN: {
                output: ['$playerId', '$score'],
                sortBy: { score: -1 },
                n: 3
            }
        },
        bottomPlayers: {
            $bottomN: {
                output: ['$playerId', '$score'],
                sortBy: { score: 1 },
                n: 3
            }
        },
        maxScores: { $maxN: { input: '$score', n: 3 } },
        minScores: { $minN: { input: '$score', n: 3 } }
    }
};
var stages1 = [
    // First Stage
    {
        $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } }
    },
    // Second Stage
    {
        $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
            totalSaleAmount: { $sum: { $multiply: ['$price', '$quantity'] } },
            averageQuantity: { $avg: '$quantity' },
            count: { $sum: 1 }
        }
    },
    // Third Stage
    {
        $sort: { totalSaleAmount: -1 }
    }
];
var stages2 = [
    // First Stage
    {
        $group: { _id: '$author', books: { $push: '$$ROOT' } }
    },
    // Second Stage
    {
        $addFields: {
            totalCopies: { $sum: '$books.copies' }
        }
    }
];
var stages3 = [
    {
        $addFields: {
            a: { $ifNull: ['$a', 'foo'] }
        }
    },
    {
        $match: {
            _id: new mongodb_1.ObjectId('stringObjecId'),
            a: { $exists: true },
            b: null,
            c: 'test',
            d: { foo: true },
            test: { $exists: true }
        }
    }
];
var stages4 = [
    {
        $addFields: {
            usersCount: {
                $let: {
                    vars: {
                        users: { $push: '$user' }
                    },
                    in: {
                        $reduce: {
                            input: '$users',
                            initialValue: 0,
                            in: {
                                $cond: { if: { $isArray: '$$this' }, then: { $size: '$$this' }, else: '$$this' }
                            }
                        }
                    }
                }
            }
        }
    }
];
(function gh12096() {
    var data = {
        $addFields: {
            name: { $meta: 'Bill' }
        }
    };
})();
function gh12269() {
    var lookup = {
        $lookup: {
            as: 'user',
            from: 'users',
            pipeline: [{
                    $search: {
                        index: 'users',
                        highlight: {
                            path: 'user.highlighted'
                        }
                    }
                }]
        }
    };
}
var vectorSearchStages = [
    {
        $vectorSearch: {
            index: 'title_vector_index',
            path: 'embedding',
            queryVector: [0.522, 0.123, 0.487],
            limit: 5,
            numCandidates: 100
        }
    },
    {
        $project: {
            title: 1,
            score: { $meta: 'searchScore' }
        }
    }
];
