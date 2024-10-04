from aryaman.scripts.category.category import category
import pickle
import pandas as pd
from aryaman.scripts.global_vars import get_full_headers,get_no_of_sublevels,get_path_to_categories_name_id_mappings_csv,get_path_to_categories_tree_pkl

def load_tree_obj(ignoreExceptionMsg=False):
    '''
    loads the category tree object from the given path
    '''
    try:
        category.setNumberOfSubLevels(get_no_of_sublevels())
        with open(get_path_to_categories_tree_pkl(),'rb') as f:
            return pickle.load(f)
    except Exception as e:
        if not ignoreExceptionMsg:
            print("Exception in loading tree object ",e)

def getCategoryObjectHandle(category_tree,category_name=None,category_id=None,ignoreExceptionMsg=False):
    '''
    returns list of category objects ,(Possible) multiple in case of searching by name .None in case of failure
    '''
    try:
        if category_id == None and category_name == None:
            raise Exception("pass one of the params")
        elif category_name != None and category_id != None:
            raise Exception("pass only one param related to category")
        
        if category_id != None:
            x = category_tree.retrieveById(category_id)
            if len(x) == 0:
                return None
            else:
                return [x[0][0]]
        elif category_name != None:
            x = category_tree.retrieveByName(category_name)
            if len(x) == 0:
                return None
            else:
                y = list()
                for val in x:
                    y.append(val[0])
                return y
    except Exception as e:
        if not ignoreExceptionMsg:
            print("Exception in getting Category object handle ",e)

def findParent(category_tree,category_name=None,category_id=None,ignoreExceptionMsg=False):
    '''
    returns list of handle of parent , returns list(len>1) of handles in case of multiple name matches, None otherwise
    '''
    try:
        if category_id == None and category_name == None:
            raise Exception("pass one of the params")
        elif category_name != None and category_id != None:
            raise Exception("pass only one param related to category")
        
        if category_id != None:
            x = category_tree.findParent(category_id)
            if x == None:
                return None
            else:
                return [x]
        elif category_name != None:
            x = category_tree.retrieveByName(category_name)
            if len(x) == 0:
                return None
            else:
                y = list()
                for val in x:
                    y.append(val[2])
                parent = []
                for val in y:
                    parent.append(category_tree.findParent(val))
                return parent
    except Exception as e:
        if not ignoreExceptionMsg:
            print("Exception in finding parent ",e)
        


def getMainAndSubCategoriesListings(category_tree,category_name=None,category_id=None,ignoreExceptionMsg=False):
    '''
    returns pandas dataframe with appropriate main and sub category columns of a particular category, multiple rows in case of name , empty dataframe
    if not matches
    '''
    try:
        if category_id == None and category_name == None:
            raise Exception("pass one of the params")
        elif category_name != None and category_id != None:
            raise Exception("pass only one param related to category")
        
        headers = get_full_headers()
        if category_id != None:
            x = category_tree.searchByCategoryId(category_id)
            if len(x) == 0:
                return pd.DataFrame(columns=headers[6:15])
            else:
                y = pd.DataFrame(x,columns=headers)
                max_val = y['depth'].max()
                return y.iloc[:,6:(6+max_val)]

        elif category_name != None:
            x = category_tree.searchByCategoryName(category_name)
            if len(x) == 0:
                return pd.DataFrame(columns=headers[6:15])
            else:
                y = pd.DataFrame(x,columns=headers)
                max_val = y['depth'].max()
                return y.iloc[:,6:(6+max_val)]
    except Exception as e:
        if not ignoreExceptionMsg:
            print("Exception in getting main and sub categories listings ",e)

def write_category_name_id_to_csv(category_tree_root,ignoreExceptionMsg=False):
    '''
    writes categories name and id mapping to the 'category_name_id_mappings.csv'

    assumes that the depth of the category tree would be less than 10000000
    '''
    try:
        x = pd.DataFrame(category_tree_root.navigateTillDepth(10000000),columns=get_full_headers())
        y = x[['name','category_id']]
        y.columns = ['name','category_id']
        y.reset_index(drop=True,inplace=True)
        y.to_csv(get_path_to_categories_name_id_mappings_csv(),index=False)
    except Exception as e:
        if not ignoreExceptionMsg:
            print("Exception in writing category name id to csv ",e)

def read_category_name_id_from_csv(ignoreExceptionMsg=False):
    '''
    reads categories into pandas' dataframe name and id mapping from the 'category_name_id_mappings.csv'
    '''
    try:
        return pd.read_csv(get_path_to_categories_name_id_mappings_csv())
    except Exception as e:
        if not ignoreExceptionMsg:
            print("Exception in reading category name id from csv ",e)

def map_name_to_id(category_name,ignoreExceptionMsg=False):
    '''
    reads csv of mappings and returns the list of ids (in case of multiple names)
    '''
    try:
        category_name = category_name.strip().lower()
        x = pd.read_csv(get_path_to_categories_name_id_mappings_csv())
        x['name'] = x['name'].str.strip().str.lower()
        return x[x['name']==category_name]['category_id'].tolist()
    except Exception as e:
        if not ignoreExceptionMsg:
            print("Exception in mapping name to id ",e)

def map_id_to_name(category_id,ignoreExceptionMsg=False):
    '''
    returns a string name that matches with id as per mappings csv
    '''
    try:
        x = pd.read_csv(get_path_to_categories_name_id_mappings_csv())
        return (x[x['category_id']==category_id]['name']).to_string(index=False)
    except Exception as e:
        if not ignoreExceptionMsg:
            print("Exception in mapping id to name ",e)


def get_all_ids_in_use(ignoreExceptionMsg=False):
    '''
    returns array of all category ids in the tree nodes (reads mappings csv)
    '''
    try:
        x = pd.read_csv(get_path_to_categories_name_id_mappings_csv())
        return x['category_id'].tolist()
    except Exception as e:
        if not ignoreExceptionMsg:
            print("Exception in getting all ids in use ",e)

def findDepth(category_tree_root,category_id,ignoreExceptionMsg=False):
    '''
    finds depth of a particular category (searches the tree), returns None in case of fail
    '''
    try:
        x = category_tree_root.searchByCategoryId(category_id)
        if len(x) == 0:
            return None
        else:
            return x[0][2]
    except Exception as e:
        if not ignoreExceptionMsg:
            print("Exception in finding depth ",e)


def delete_a_branch(category_tree,category_id_to_remove,ignoreExceptionMsg=False):
    '''
    removes the branch of that category tree by finding parent and removing the child form its array
    '''
    try:
        x = category_tree.findParent(category_id_to_remove)
        if x != None:
            for val in x._category__sub_categories:
                if val.category_id == category_id_to_remove:
                    x._category__sub_categories.remove(val)
                    break
    except Exception as e:
        if not ignoreExceptionMsg:
            print("Exception in deleting a branch ",e)

def disconnect_sub_nodes(category_tree,parentNodeId,ignoreExceptionMsg=False):
    '''
    disconnects all the sub category nodes and clears the sub categories array of parent node
    Use cautiously
    '''
    try:
        x = category_tree.retrieveById(parentNodeId)
        if len(x) != 0:
            x[0][0]._category__sub_categories.clear()
    except Exception as e:
        if not ignoreExceptionMsg:
            print("Exception in disconnecting sub nodes ",e)

def create_categories_hierarchy(df,lastColumnIntIndex,starting_category_id,no_of_sub_levels,ignoreExceptionMsg=False): 
    # starting_category_id = 1 in the very beginning , it is inclusive , that is , it would itself be used in  node below
    # all further category ids are placed sequentially wrt starting_category_id
    # Note : very crucial to provide the right starting id after analyzing the already used ones
    # we are filling ids in sequence like 1 ,2 ,3 .... 245, 246 .. like that 
    # save it or update in an existing file after the creation process is over
    # the trivial node root has category id of 0
    try:
        main_categories = df['Main Category'].str.strip().unique()
        category.setNumberOfSubLevels(no_of_sub_levels)
        root = category('root',0,0)
        root.fillSubCategoriesThruNames(main_categories,[x for x in range(starting_category_id,starting_category_id+len(main_categories))])
        starting_category_id += len(main_categories)
        def recur(inner_df,colIndex,parentDepth):
            nonlocal starting_category_id
            if colIndex == lastColumnIntIndex:
                leaf_categories = inner_df.iloc[:,lastColumnIntIndex].fillna('').str.strip().unique()
                leaf_categories_arr = []
                for val in leaf_categories:
                    if val!='':
                        leaf_categories_arr.append(category(val,parentDepth+1,starting_category_id))
                        starting_category_id += 1  #increment starting_category_id just after using it once
                return leaf_categories_arr
            
            inner_categories = inner_df.iloc[:,colIndex].fillna('').str.strip().unique()
            inner_categories_arr = []
            for val in inner_categories:
                if val != '':
                    inner_categories_arr.append(category(val,parentDepth+1,starting_category_id))
                    starting_category_id+=1
            for inner_category in inner_categories_arr:
                children_nodes = recur(inner_df[inner_df.iloc[:,colIndex]==inner_category.name],colIndex+1,inner_category.depth)
                inner_category.setSubCategoriesDirectly(children_nodes)
            return inner_categories_arr
        for child in root.getSubCategoriesList(): # loop var here references the object and not creates a copy
            sub_category_objects = recur(df[df['Main Category']==child.name],1,child.depth)
            child.setSubCategoriesDirectly(sub_category_objects)
        return root
    except Exception as e:
        if not ignoreExceptionMsg:
            print("Exception in creating category tree hierarchy ",e)

def showDataframeOfTree(category_tree_root,tillDepth,ignoreExceptionMsg=False):
    '''
    returns pandas dataframe with navigation of the tree upto a certain depth
    '''
    try:
        x = pd.DataFrame(category_tree_root.navigateTillDepth(tillDepth),columns=get_full_headers())
        return x[['name','category_id','depth','main_category','sub_category_1','sub_category_2','sub_category_3','sub_category_4','sub_category_5','sub_category_6','sub_category_7','sub_category_8']]
    except Exception as e:
        if not ignoreExceptionMsg:
            print("Exception in showing dataframe of tree(till depth) ",e)

def findPath(category_root,category_id,returnStringPath=False,returnIdPath=False,ignoreExceptionMsg=False):
    try:
        if not returnStringPath and not returnIdPath:
            raise ValueError("Set one of the params true")
        
        x = category_root.searchByCategoryId(category_id)
        if len(x) == 0:
            return None
        else:
            if returnStringPath:
                return x[0][3]
            else:
                return x[0][4]
    except Exception as e:
        if not ignoreExceptionMsg:
            print("Exception occurred in finding path for a category ",e)
    