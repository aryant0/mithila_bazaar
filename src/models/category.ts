export interface CategoryResponse {
	categoryValues: CategoryValue[];
	count: number;
	total_records: number;
	current_page: number;
	per_page: number;
	total_pages: number;
}

export interface CategoryValue {
	categoryValueId: number; // Unique identifier for the category value
	categoryValueName: string; // Display name of the category value
	catName: string; // Type of category (e.g., Department, Main-Category, Sub-Category, Brand, Size-Weight)
	catStatus: string;
}