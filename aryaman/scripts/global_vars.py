def get_path_to_categories_tree_pkl():
    return r"aryaman\pickles\categories tree\CategoriesTree.pkl"

def get_path_to_column_headers_txt():
    return r"aryaman\txt\column headers\column_headers.txt"

def get_path_to_categories_name_id_mappings_csv():
    return r"aryaman\csv\mappings\category_name_id_mappings.csv"

def get_no_of_sublevels():
    return 8

def get_full_headers():
    return ['name','category_id','depth','string_path','category_id_Path','root_column','main_category','sub_category_1','sub_category_2','sub_category_3','sub_category_4','sub_category_5','sub_category_6','sub_category_7','sub_category_8','root_id','main_category_id','sub_category_1_id','sub_category_2_id','sub_category_3_id','sub_category_4_id','sub_category_5_id','sub_category_6_id','sub_category_7_id','sub_category_8_id']

def get_short_description_headers():
    return ['object handle','name','category_id']

def get_path_to_amazon_uk_dataset():
    return r"..\Dataset\amz_uk_processed_data.csv"

def get_paths_to_amazon_second_dataset(categories_id_name_dataset=False,products_dataset=False):
    if not categories_id_name_dataset and not products_dataset:
        raise ValueError("Provide one of the params as true")
    else:
        if products_dataset:
            return r"..\Dataset\amz_products_second_dataset.csv"
        else:
            return r"..\Dataset\amz_categories_second_dataset.csv"
        
def get_path_to_identified_categories_UK():
    return r"aryaman\csv\categories and products\IdentifiedCategoriesUK.csv"

def get_path_to_draw_io_UK_csv():
    return r"aryaman\csv\drawIO\drawIOCsvUK.csv"

def get_path_to_all_identified_products_UK():
    return r"aryaman\csv\categories and products\AllIdentifiedProductsUK.csv"

def get_path_to_prepared_sample_on_datasetUK():
    return r"aryaman\csv\categories and products\preparedSampleOnDatasetUK.csv"

