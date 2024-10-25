from enum import Enum


class BabyProducts(Enum):
    Diapers = 1
    Baby_Wipes = 2
    Baby_Clothing = 3
    Strollers = 4
    Car_Seats = 5
    Baby_Toys = 6
    Baby_Bathing_Products = 7
    Baby_Skincare_Products = 8
    Baby_Feeding_Bottles = 9
    Nursing_and_Breastfeeding_Products = 10
    Cribs_and_Bassinets = 11
    # Baby_Health_Monitors = 12
    # Babyproofing_Kits = 13
    Baby_Carriers = 12
    # Baby_Bedding_Sets = 15
    __class_name = "Baby Products"

    __subs = ["Diapers" ,"Baby Wipes" ,"Baby Clothing" ,"Strollers" ,"Car Seats" ,"Baby Toys" ,"Baby Bathing Products" ,"Baby Skincare Products" ,"Baby Feeding Bottles" ,"Nursing & Breastfeeding Products" ,"Cribs & Bassinets"  ,"Baby Carriers" ]
    @classmethod
    def get_sub_name(cls, member):
        return cls.__subs[member.value-1]
    
    @classmethod
    def get_all_sub_names(cls):
        return cls.__subs

    # @classmethod
    # def get_description(cls, member):
    #     descriptions = {
    #         cls.DIAPERS: "Products related to baby diapers",
    #         cls.SKINCARE: "Products related to baby skincare",
    #         # Add more descriptions as needed
    #     }
    #     return descriptions.get(member, "No description available")

    @classmethod
    def get_class_name(cls):
        return cls.__class_name
    


class BeautyAndPersonalCare(Enum):
    Skin_Care_Products = 1
    Hair_Care_Products = 2
    Makeup_Kits = 3
    Perfumes = 4
    Shampoos_and_Conditioners = 5
    Hair_Styling_Tools = 6
    Oral_Care_Products = 7
    Bath_and_Body_Wash = 8
    Mens_Grooming_Kits = 9
    Face_Creams_and_Serums = 10
    Body_Lotions_and_Moisturizers = 11
    Shaving_and_Hair_Removal_Products = 12
    Nail_Polish_and_Nail_Care = 13
    Essential_Oils = 14
    Sunscreens_and_Tanning_Products = 15
    __class_name = "Beauty & Personal Care"

    __subs = ["Skin Care Products" ,"Hair Care Products" ,"Makeup Kits" ,"Perfumes" ,"Shampoos & Conditioners" ,"Hair Styling Tools" ,"Oral Care Products" ,"Bath & Body Wash" ,"Men's Grooming Kits" ,"Face Creams & Serums" ,"Body Lotions & Moisturizers" ,"Shaving & Hair Removal Products" ,"Nail Polish & Nail Care" ,"Essential Oils" ,"Sunscreens & Tanning Products"]
    @classmethod
    def get_sub_name(cls, member):
        return cls.__subs[member.value-1]
    
    @classmethod
    def get_all_sub_names(cls):
        return cls.__subs

    # @classmethod
    # def get_description(cls, member):
    #     descriptions = {
    #         cls.DIAPERS: "Products related to baby diapers",
    #         cls.SKINCARE: "Products related to baby skincare",
    #         # Add more descriptions as needed
    #     }
    #     return descriptions.get(member, "No description available")

    @classmethod
    def get_class_name(cls):
        return cls.__class_name
    

class Books(Enum):
    Fiction_Books = 1
    Non_Fiction_Books  = 2
    Childrens_Story_Books  = 3
    Self_Help_Books  = 4
    Academic_Textbooks  = 5
    Biographies_and_Autobiographies  = 6
    Cookbooks_and_Recipe_Books  = 7
    Mystery_and_Thriller_Books  = 8
    Science_Fiction_Books  = 9
    Romance_Novels  = 10
    # Graphic_Novels  = 11
    # Historical_Fiction  = 12
    # Travel_Guides  = 13
    Poetry_Books  = 11
    # Parenting_Books  = 15

    __class_name = "Books"

    __subs = ["Fiction Books" ,"Non-Fiction Books" ,"Children's Story Books" ,"Self-Help Books" ,"Academic Textbooks" ,"Biographies & Autobiographies" ,"Cookbooks & Recipe Books" ,"Mystery & Thriller Books" ,"Science Fiction Books" ,"Romance Novels"  ,"Poetry Books" ]
    @classmethod
    def get_sub_name(cls, member):
        return cls.__subs[member.value-1]
    
    @classmethod
    def get_all_sub_names(cls):
        return cls.__subs

    # @classmethod
    # def get_description(cls, member):
    #     descriptions = {
    #         cls.DIAPERS: "Products related to baby diapers",
    #         cls.SKINCARE: "Products related to baby skincare",
    #         # Add more descriptions as needed
    #     }
    #     return descriptions.get(member, "No description available")

    @classmethod
    def get_class_name(cls):
        return cls.__class_name

class ClothingShoesAndJewelry(Enum):
    Mens_T_Shirts = 1
    Womens_Dresses = 2
    Sneakers_for_Men = 3
    Womens_Heels = 4
    Kids_Clothing_Sets = 5
    Womens_Jewelry = 6
    Mens_Watches = 7
    Casual_Shoes_for_Men = 8
    # Formal_Shoes_for_Women = 9
    Sports_Shoes_for_Women = 9
    # Ethnic_Wear_for_Men = 11
    # Winter_Jackets_for_Men = 12
    Womens_Handbags = 10
    Mens_Belts_and_Wallets = 11
    Womens_Scarves_and_Wraps = 12

    __class_name = "Clothing , Shoes & Jewelry"

    __subs = ["Men's T-Shirts" ,"Women's Dresses" ,"Sneakers for Men" ,"Women's Heels" ,"Kids' Clothing Sets" ,"Women's Jewelry" ,"Men's Watches" ,"Casual Shoes for Men" ,"Sports Shoes for Women" ,"Women's Handbags" ,"Men's Belts & Wallets" ,"Women's Scarves & Wraps"]
    @classmethod
    def get_sub_name(cls, member):
        return cls.__subs[member.value-1]
    
    @classmethod
    def get_all_sub_names(cls):
        return cls.__subs
    # @classmethod
    # def get_description(cls, member):
    #     descriptions = {
    #         cls.DIAPERS: "Products related to baby diapers",
    #         cls.SKINCARE: "Products related to baby skincare",
    #         # Add more descriptions as needed
    #     }
    #     return descriptions.get(member, "No description available")

    @classmethod
    def get_class_name(cls):
        return cls.__class_name


class Electronics(Enum):
    Mobile_Phones = 1
    Laptops = 2
    Earphones_and_Headphones = 3
    Smartwatches = 4
    Power_Banks = 5
    Tablets = 6
    Bluetooth_Speakers = 7
    Mobile_Accessories = 8
    Smart_TVs = 9
    # Home_Audio_Systems = 10
    Gaming_Consoles = 10
    # Computer_Monitors = 12
    # DSLR_Cameras = 13
    Printers_and_Scanners = 11
    # WiFi_Routers = 15

    __class_name = "Electronics"
    
    __subs = ["Mobile Phones" ,"Laptops" ,"Earphones & Headphones" ,"Smartwatches" ,"Power Banks" ,"Tablets" ,"Bluetooth Speakers" ,"Mobile Accessories" ,"Smart TVs" ,"Gaming Consoles" ,"Printers & Scanners" ]
    @classmethod
    def get_sub_name(cls, member):
        return cls.__subs[member.value-1]
    
    @classmethod
    def get_all_sub_names(cls):
        return cls.__subs

    # @classmethod
    # def get_description(cls, member):
    #     descriptions = {
    #         cls.DIAPERS: "Products related to baby diapers",
    #         cls.SKINCARE: "Products related to baby skincare",
    #         # Add more descriptions as needed
    #     }
    #     return descriptions.get(member, "No description available")

    @classmethod
    def get_class_name(cls):
        return cls.__class_name


class HomeAndKitchen(Enum):
    Kitchen_Appliances = 1
    Cookware_Sets = 2
    Bed_Sheets_and_Linens = 3
    Home_Decor_Items = 4
    Storage_Solutions = 5
    Cleaning_Supplies = 6
    Dining_and_Serveware = 7
    Water_Purifiers = 8
    Curtains_and_Drapes = 9
    Air_Purifiers = 10
    Vacuum_Cleaners = 11
    Kitchen_Storage_Containers = 12
    Bath_Towels_and_Mats = 13
    Lighting_and_Lamps = 14
    Home_Furniture_Sets = 15

    __class_name = "Home & Kitchen"

    __subs = ["Kitchen Appliances" ,"Cookware Sets" ,"Bed Sheets & Linens" ,"Home Decor Items" ,"Storage Solutions" ,"Cleaning Supplies" ,"Dining & Serveware" ,"Water Purifiers" ,"Curtains & Drapes" ,"Air Purifiers" ,"Vacuum Cleaners" ,"Kitchen Storage Containers" ,"Bath Towels & Mats" ,"Lighting & Lamps" ,"Home Furniture Sets"]
    @classmethod
    def get_sub_name(cls, member):
        return cls.__subs[member.value-1]
    
    @classmethod
    def get_all_sub_names(cls):
        return cls.__subs
    # @classmethod
    # def get_description(cls, member):
    #     descriptions = {
    #         cls.DIAPERS: "Products related to baby diapers",
    #         cls.SKINCARE: "Products related to baby skincare",
    #         # Add more descriptions as needed
    #     }
    #     return descriptions.get(member, "No description available")

    @classmethod
    def get_class_name(cls):
        return cls.__class_name
    

class SportsAndOutdoors(Enum):
    Fitness_Equipment = 1
    Running_Shoes = 2
    Yoga_Mats = 3
    Sportswear_for_Men = 4
    Sportswear_for_Women = 5
    Camping_and_Hiking_Gear = 6
    Bicycles_and_Cycling_Accessories = 7
    Swimming_Gear = 8
    Cricket_Bats_and_Balls = 9
    Badminton_Racquets_and_Shuttlecocks = 10
    Footballs_and_Accessories = 11
    Tennis_Racquets = 12
    Gym_Gloves_and_Accessories = 13
    Outdoor_Tents = 14
    Water_Bottles_and_Shakers = 15

    __class_name = "Sports & Outdoors"

    __subs = ["Fitness Equipment" ,"Running Shoes" ,"Yoga Mats" ,"Sportswear for Men" ,"Sportswear for Women" ,"Camping & Hiking Gear" ,"Bicycles & Cycling Accessories" ,"Swimming Gear" ,"Cricket Bats & Balls" ,"Badminton Racquets & Shuttlecocks" ,"Footballs & Accessories" ,"Tennis Racquets" ,"Gym Gloves & Accessories" ,"Outdoor Tents" ,"Water Bottles & Shakers"]
    @classmethod
    def get_sub_name(cls,member):
        return cls.__subs[member.value-1]
    
    @classmethod
    def get_all_sub_names(cls):
        return cls.__subs
    # @classmethod
    # def get_description(cls, member):
    #     descriptions = {
    #         cls.DIAPERS: "Products related to baby diapers",
    #         cls.SKINCARE: "Products related to baby skincare",
    #         # Add more descriptions as needed
    #     }
    #     return descriptions.get(member, "No description available")

    @classmethod
    def get_class_name(cls):
        return cls.__class_name
    

