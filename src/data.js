function buildMetaIndex(meta) {
	let index = {};
	meta.forEach(function(item, idx) {
		let key = item.group + item.meta;
		index[key] = idx;
	});
	return index;
}

function buildVisibleColumns(meta) {
	let visibles = meta.filter(function(mcol) {
		return mcol.display;
	});
	return visibles.map(function(item) {
		return item.pos - 1;
	});
}

/** Iterates a list, applying the mapping function, returns "mapped" result.*/
function myMap(mapperFn, arr) {
	var newList = [];
	for (let i = 0; i < arr.length; ++i) {
		newList.push(mapperFn(arr[i], i, arr));
	}
	return newList;
}

/** Iterates a row of data, applying the mapping function to visible columns,
            returns "mapped" result.*/
function columnMap(mapperFn, row, dispCols) {
	var returnList = [];
	for (let i = 0; i < row.length; ++i) {
		if (dispCols.indexOf(i) > -1) {
			returnList.push(mapperFn(row[i], i, row));
		}
	}
	return returnList;
}

/**
 * An object representing one row of the queries data. Three methods are
 * available. map -- provides mapping over the rows visible columns,
 * d -- returns the value by column position, m -- returns the value by
 * named text meta data, and group, also exposes the row array.
 */
function rowWrapper(row, metaIndex, displayColumns) {
	return {
		map: function(mapperFunc) {
			return columnMap(mapperFunc, this.row, displayColumns);
		},
		d: function(pos) {
			return this.row[pos];
		},
		m: function(meta, group) {
			let g = group || 0;
			return this.row[this.metaIndex[g + meta]];
		},
		toString: function() {
			return JSON.stringify(row);
		},
		row: row || [],
		metaIndex: metaIndex
	};
}

export function transformToWrappedRows(data, metaIndex, visibleColumns) {
	return myMap(function(rObj, idx, data) {
		return rowWrapper(rObj["d"], metaIndex, visibleColumns);
	}, data);
}
/**
 * rows collection is an array of rowWrapper created objects.
 * There are two accessor functions, d (by array index), and m
 * (by meta column and group).
 *
 */
export function dataSet(data, meta) {
	let metaIndex = buildMetaIndex(meta);
	let visibleColumns = buildVisibleColumns(meta);
	let rows = transformToWrappedRows(data, metaIndex, visibleColumns);
	const orginalRows = rows.slice(0);

	return {
		map: function(mapperFunc, collection) {
			return myMap(mapperFunc, collection || rows);
		},
		filter: function(filterFunc, collection) {
			let arr = collection || rows;
			return arr.filter(filterFunc);
		},
		filteredMap: function(filterFunc, mapperFunc, collection) {
			return this.map(mapperFunc, this.filter(filterFunc, collection));
		},
		meta: meta,
		rows: rows
	};
}

export function groupedDataSet(data, meta, grouper) {
	let metaIndex = buildMetaIndex(meta);
	let visibleColumns = buildVisibleColumns(meta);

	let grouped = {};
	data.forEach(function(rowObj) {
		let key = rowObj.d[grouper];
		if (!grouped.hasOwnProperty(key)) {
			grouped[key] = [];
		}
		grouped[key].push(rowObj);
	});

	Object.keys(grouped).forEach(function(key) {
		let dat = grouped[key];
		grouped[key] = transformToWrappedRows(dat, metaIndex, visibleColumns);
	});
	console.log(grouped);
	return grouped;
}

export const data = {
	data: [
		{
			d: [
				112464,
				"Advanced Technology : Car loan Application",
				55628,
				"Advanced Technology",
				441,
				"Notoya's test",
				"Car loan Application"
			]
		},
		{
			d: [
				119335,
				"Advanced Technology : notoya test bpmn",
				55628,
				"Advanced Technology",
				441,
				"Notoya's test",
				"notoya test bpmn"
			]
		},
		{
			d: [
				118960,
				"Personnel Security Investigations and Clearance Certification : Background Investigations",
				55615,
				"Personnel Security Investigations and Clearance Certification",
				441,
				"Notoya's test",
				"Background Investigations"
			]
		},
		{
			d: [
				118962,
				"Personnel Security Investigations and Clearance Certification : Personnel Background Investigation",
				55615,
				"Personnel Security Investigations and Clearance Certification",
				441,
				"Notoya's test",
				"Personnel Background Investigation"
			]
		},
		{
			d: [
				118662,
				"Personnel Security Investigations and Clearance Certification : Test",
				55615,
				"Personnel Security Investigations and Clearance Certification",
				441,
				"Notoya's test",
				"Test"
			]
		},
		{
			d: [
				118660,
				"Personnel Security Investigations and Clearance Certification : bob",
				55615,
				"Personnel Security Investigations and Clearance Certification",
				441,
				"Notoya's test",
				"bob"
			]
		},
		{
			d: [
				118964,
				"Personnel Security Investigations and Clearance Certification : ewsf",
				55615,
				"Personnel Security Investigations and Clearance Certification",
				441,
				"Notoya's test",
				"ewsf"
			]
		},
		{
			d: [
				118664,
				"Personnel Security Investigations and Clearance Certification : test",
				55615,
				"Personnel Security Investigations and Clearance Certification",
				441,
				"Notoya's test",
				"test"
			]
		}
	],
	meta: [
		{
			pos: 1,
			meta: "PSEUDO.BPMN_DIAGRAM_EID",
			display: true,
			label: "ELEMENT_ID",
			type: 2,
			group: 2
		},
		{
			pos: 2,
			meta: "ELEMENT.DESCRIPTION",
			display: true,
			label: "Capability",
			type: 12,
			group: 2
		},
		{
			pos: 3,
			meta: "ELEMENT_ATTR_C190.ELEMENT_ID",
			display: false,
			label: "Element ID",
			type: 2,
			group: 1
		},
		{
			pos: 4,
			meta: "ELEMENT.DESCRIPTION",
			display: true,
			label: "Capability",
			type: 12,
			group: 1
		},
		{
			pos: 5,
			meta: "CLASS.CLASS_ID",
			display: false,
			label: "441",
			type: 2,
			group: 0
		},
		{
			pos: 6,
			meta: "ELEMENT.NEED",
			display: true,
			label: "Need",
			type: 12,
			group: 0
		},
		{
			pos: 7,
			meta: "ELEMENT_ATTR_C441.NAME",
			display: true,
			label: "Diagram",
			type: 12,
			group: 0
		}
	],
	rowCount: 8,
	id: 3781,
	label: "Project Business Capability Business Process"
};
