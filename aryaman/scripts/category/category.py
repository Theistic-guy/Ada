class category():

    __no_of_sub_levels = 0 # zero means only top or main categories 
    # category_id would be a unique no across all category nodes 
    def __init__(self,name,depth,category_id):
        try:
            if not (isinstance(name,str)) :
                raise Exception("name is not of string type")
            if not (isinstance(depth,int)) :
                raise Exception("depth is not of int type")
            if not (isinstance(category_id,int)) :
                raise Exception("category id  is not of int type")
            self.name = name
            self.depth= depth
            self.__sub_categories = []
            self.category_id = category_id
        except Exception as e:
            print("Error in category object creation",e)

    
    def __str__(self):
        return self.name
    
    def setNumberOfSubLevels(numSubLevels):
        try:
            if(not isinstance(numSubLevels,int)):
                raise Exception("Enter valid int as no of sub levels")
            if (numSubLevels < 0):
                raise Exception("Enter a number equal to or greater than zero")
            category._category__no_of_sub_levels = numSubLevels
        except Exception as e:
            print("Exception occurred while setting no of sub levels class variable in category class " , e)
    
    def fillSubCategoriesThruNames(self,subCategoriesStringList,category_Ids): # assuming we have unique ids provided
        try:
            if not all(isinstance(item,str) for item in subCategoriesStringList):
                raise Exception("entries in names of  categories list provided doesn not have all string entries")
            if not all(isinstance(item,int) for item in category_Ids):
                raise Exception("category ids  provided doesn not have all int entries")
            if len(subCategoriesStringList) != len(category_Ids):
                raise Exception("lenght mismatched between provided lists of names and ids")
            self.__sub_categories.clear()
            for val in enumerate(subCategoriesStringList):
                child = category(val[1],self.depth+1,category_Ids[val[0]])
                self.__sub_categories.append(child)
        except Exception as e:
            print("Error in sub categories creating thru list : ", e)
    
    def setSubCategoriesDirectly(self,subCategoriesObjectList):
        try:
            if all(isinstance(item,category)for item in subCategoriesObjectList):
                self.__sub_categories = subCategoriesObjectList
            else:
                raise Exception("invalid object type assignment to categories list") 
        except Exception as e:
            print(e)

    def getSubCategoriesList(self):
            return self.__sub_categories # python returns refernce to the original list, modifications outside affect this inner list

    def count(self):
            return len(self.__sub_categories)
    
    def print_sub_categories(self):
        for cat in self.__sub_categories:
            print(cat)

    #private method
    def __navigatetilldepth(self,navArray,pathString,idString,depth):
        def splitNavigationString(navString):
            arr = navString[::-1].split(chr(8592))
            arr.reverse()
            arr += [None]*(category._category__no_of_sub_levels+2-len(arr)) # +2 for root column and main category col
            return arr
        if len(self.__sub_categories)==0 and self.depth <= depth :
                pathString += (chr(8592) if self.depth!=0 else '') + self.name[::-1]
                path_split_arr = splitNavigationString(pathString)
                idString += (chr(8592) if self.depth!=0 else '') + str(self.category_id)[::-1]
                id_split_arr = splitNavigationString(idString)
                navArray.append([self.name,self.category_id,self.depth,pathString[::-1],idString[::-1]]+path_split_arr+id_split_arr)
                return
        if self.depth <= depth:
            pathString += (chr(8592) if self.depth!=0 else '') + self.name[::-1]
            path_split_arr = splitNavigationString(pathString)
            idString += (chr(8592) if self.depth!=0 else '') + str(self.category_id)[::-1]
            id_split_arr = splitNavigationString(idString)
            navArray.append([self.name,self.category_id,self.depth,pathString[::-1],idString[::-1]]+path_split_arr+id_split_arr)
            for cat in self.__sub_categories:
                cat._category__navigatetilldepth(navArray,pathString,idString,depth)
    
    def navigateTillDepth(self,depth):
        navArray = []
        pathString = ''
        idString = ''
        self._category__navigatetilldepth(navArray,pathString,idString,depth)
        return navArray # 'name','category_id','depth','string_path','category_id_Path','root_column','main_category','sub_category_1','sub_category_2','sub_category_3','sub_category_4','sub_category_5','sub_category_6','sub_category_7','sub_category_8','root_id','main_category_id','sub_category_1_id','sub_category_2_id','sub_category_3_id','sub_category_4_id','sub_category_5_id','sub_category_6_id','sub_category_7_id','sub_category_8_id'
    
    #private method
    def __navigateatdepth(self,navArray,pathString,idString,depth):
        def splitNavigationString(navString):
            arr = navString[::-1].split(chr(8592))
            arr.reverse()
            arr += [None]*(category._category__no_of_sub_levels+2-len(arr)) # +2 for root column and main category col
            return arr
        if self.depth == depth:
                pathString += (chr(8592) if self.depth!=0 else '') + self.name[::-1]
                path_split_arr = splitNavigationString(pathString)
                idString += (chr(8592) if self.depth!=0 else '') + str(self.category_id)[::-1]
                id_split_arr = splitNavigationString(idString)
                navArray.append([self.name,self.category_id,self.depth,pathString[::-1],idString[::-1]]+path_split_arr+id_split_arr)
                return
        if (len(self.__sub_categories) != 0):
            pathString += (chr(8592) if self.depth!=0 else '') + self.name[::-1]
            path_split_arr = splitNavigationString(pathString)
            idString += (chr(8592) if self.depth!=0 else '') + str(self.category_id)[::-1]
            id_split_arr = splitNavigationString(idString)
            for cat in self.__sub_categories:
                cat._category__navigateatdepth(navArray,pathString,idString,depth)
    
    def navigateAtDepth(self,depth):
        navArray = []
        pathString = ''
        idString = ''
        self._category__navigateatdepth(navArray,pathString,idString,depth)
        return navArray #'name','category_id','depth','string_path','category_id_Path','root_column','main_category','sub_category_1','sub_category_2','sub_category_3','sub_category_4','sub_category_5','sub_category_6','sub_category_7','sub_category_8','root_id','main_category_id','sub_category_1_id','sub_category_2_id','sub_category_3_id','sub_category_4_id','sub_category_5_id','sub_category_6_id','sub_category_7_id','sub_category_8_id'
    def __searchbycategoryid(self,pathString,idString,category_id):
        if(self.category_id == category_id):
            pathString = self.name + (chr(8592) if self.depth!=0 else '') + pathString
            idString = str(self.category_id) + (chr(8592) if self.depth!=0 else '') + idString
            arr = pathString.split(chr(8592))
            arr.reverse()
            arr += [None]*(category._category__no_of_sub_levels+2-len(arr))
            arr2 = idString.split(chr(8592))
            arr2.reverse()
            arr2 += [None]*(category._category__no_of_sub_levels+2-len(arr2))
            return [self.name,self.category_id,self.depth,pathString,idString] + arr + arr2
        else:
            pathString = self.name + (chr(8592) if self.depth!=0 else '') + pathString
            idString = str(self.category_id) + (chr(8592) if self.depth!=0 else '') + idString
            for cat in self.__sub_categories:
                x = cat._category__searchbycategoryid(pathString,idString,category_id)
                if x != None:
                    return x
        return None
        
    def searchByCategoryId(self,category_id):
        pathString = ''
        idString = ''
        x = self._category__searchbycategoryid(pathString,idString,category_id)
        if x == None:
            return []
        else:
            return [x]


    def __searchbycategoryname(self,answerarr,pathString,idString,category_name):
        pathString = self.name + (chr(8592) if self.depth!=0 else '') + pathString
        idString = str(self.category_id) + (chr(8592) if self.depth!=0 else '') + idString
        if(self.name.strip().lower() == category_name):
            arr = pathString.split(chr(8592))
            arr.reverse()
            arr += [None]*(category._category__no_of_sub_levels+2-len(arr))
            arr2 = idString.split(chr(8592))
            arr2.reverse()
            arr2 += [None]*(category._category__no_of_sub_levels+2-len(arr2))
            answerarr.append([self.name,self.category_id,self.depth,pathString,idString] + arr + arr2)

        for cat in self.__sub_categories:
            cat._category__searchbycategoryname(answerarr,pathString,idString,category_name)
        

    def searchByCategoryName(self,category_name):
        category_name = category_name.strip().lower()
        pathString = ''
        idString = ''
        answerarr = []
        self._category__searchbycategoryname(answerarr,pathString,idString,category_name)
        return answerarr
    def __retrievebyname(self,answerarr,category_name):
        if(self.name.strip().lower() == category_name):
            answerarr.append([self,self.name,self.category_id])
        for cat in self.__sub_categories:
            cat._category__retrievebyname(answerarr,category_name)
        
    def retrieveByName(self,category_name):
        category_name = category_name.strip().lower()
        answerarr = []
        self._category__retrievebyname(answerarr,category_name)
        return answerarr
    
    def __retrievebyid(self,category_id):
        if(self.category_id == category_id):
            return [self,self.name,self.category_id]
        for cat in self.__sub_categories:
            x= cat._category__retrievebyid(category_id)
            if x!=None:
                return x
        return None
        
    def retrieveById(self,category_id):
        x = self._category__retrievebyid(category_id)
        if x == None:
            return []
        else:
            return [x] # return type 2d array
        
    def parseNamePath(self,namePathString,isStartNodeAtEnd=True):
        '''
            assumes the starting node is the one on which this function is called
        '''
        arr = namePathString.split(chr(8592))
        if(isStartNodeAtEnd):
            arr.reverse()

        
        if len(arr) == 1:
            if(arr[0]==self.name):
                return self
            else:
                return None
        elif len(arr) > 1:
            if(arr[0]==self.name):
                nextpos = 1
                current_cat = self
                while(nextpos<len(arr)):
                    found = False
                    for cat in current_cat.__sub_categories:
                        if cat.name == arr[nextpos]:
                            nextpos += 1
                            current_cat = cat
                            found = True
                            break
                    if not found:
                        break
                else:
                    return current_cat
        return None
    
    def parseIdPath(self,idPathString,isStartNodeAtEnd=True):
        '''
            assumes the starting node is the one on which this function is called
        '''
        arr = idPathString.split(chr(8592))
        if(isStartNodeAtEnd):
            arr.reverse()

        
        if len(arr) == 1:
            if(arr[0]==str(self.category_id)):
                return self
            else:
                return None
        elif len(arr) > 1:
            if(arr[0]==str(self.category_id)):
                nextpos = 1
                current_cat = self
                while(nextpos<len(arr)):
                    found = False
                    for cat in current_cat.__sub_categories:
                        if str(cat.category_id) == arr[nextpos]:
                            nextpos += 1
                            current_cat = cat
                            found = True
                            break
                    if not found:
                        break
                else:
                    return current_cat
        return None
    
    def __findparent(self,category_id):
        for cat in self.__sub_categories:
            if (cat.category_id == category_id):
                return self
        for cat in self.__sub_categories:
            x = cat._category__findparent(category_id)
            if x != None:
                return x
        return None
        
    def findParent(self,category_id):
        if (category_id == 0):
            return None
        return self._category__findparent(category_id) 

    def return_depth(self):
        return self.depth
