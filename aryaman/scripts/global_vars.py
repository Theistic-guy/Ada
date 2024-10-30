def get_path_to_categories_tree_pkl():
    return r"aryaman\pickles\categories_tree\CategoriesTree.pkl"

def get_path_to_column_headers_txt():
    return r"aryaman\txt\column_headers\column_headers.txt"

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
    return r"aryaman\csv\categories_and_products\IdentifiedCategoriesUK.csv"

def get_path_to_draw_io_UK_csv():
    return r"aryaman\csv\drawIO\drawIOCsvUK.csv"

def get_path_to_all_identified_products_UK():
    return r"aryaman\csv\categories_and_products\AllIdentifiedProductsUK.csv"

def get_path_to_prepared_sample_on_datasetUK():
    return r"aryaman\csv\categories_and_products\preparedSampleOnDatasetUK.csv"

def get_path_to_AmazonIndia_anirudh_singh_chauhan(cameras=False,laptops=False,mobiles=False,tvs=False):
    if cameras:
        return r"..\Dataset\AmazonIndia\AnirudhSinghChauhan\amazon_cameras.csv"
    elif laptops:
        return r"..\Dataset\AmazonIndia\AnirudhSinghChauhan\amazon_laptops.csv"
    elif mobiles:
        return r"..\Dataset\AmazonIndia\AnirudhSinghChauhan\amazon_mobiles.csv"
    elif tvs:
        return r"..\Dataset\AmazonIndia\AnirudhSinghChauhan\amazon_tvs.csv"
    

def get_path_to_AmazonIndia_asasnicka():
    return r"..\Dataset\AmazonIndia\Asasnicka\amz_in_total_products_data_processed.csv"

def get_path_to_AmazonIndia_promptCloud():
    return r"..\Dataset\AmazonIndia\PromptCloud\marketing_sample_for_amazon_in-ecommerce_products__20190701_20190731__30k_data.csv"

def get_path_to_AmazonIndia_theDevastator():
    return r"..\Dataset\AmazonIndia\TheDevastator\home_sdf_marketing_sample_for_amazon_in-ecommerce__20191001_20191031__30k_data.csv"

def get_path_to_AmazonIndia_gauravRajeshSahani(train=False,test=False):
    if train:
        return r"..\Dataset\AmazonIndia\GauravRajeshSahani\Amazon Product Listings October 2020 Train.csv"
    elif test:
        return r"..\Dataset\AmazonIndia\GauravRajeshSahani\Amazon Product Listings October 2020 Test.csv"
    
def get_path_to_flipkartProducts():
    return r"..\Dataset\FlipKartProducts\flipkart_com-ecommerce_sample.csv"
    

    


    