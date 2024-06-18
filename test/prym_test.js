const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');
const LoginPage = require('../pages/loginPage');
const RegistrationPage = require('../pages/registrationPage');
const MarketplacePage = require('../pages/marketplacePage');
const DashboardPage = require('../pages/dashboardPage');
const CreateNFTPage = require('../pages/createNFTPage');
const EditProfilePage = require('../pages/editProfilePage');
const ModerationPage = require('../pages/moderationPage');
const UserManagementPage = require('../pages/userManagementPage');

describe('Authorization', () => {
    it('should successfully log in with valid credentials', () => {
        LoginPage.navigateToLoginPage();
        LoginPage.enterCredentials('validUsername', 'validPassword');
        LoginPage.clickLoginButton();
        expect(LoginPage.isLoggedIn()).toBe(true);
    });
});

describe('Authorization', () => {
    it('should return to the previous page after successful login', () => {
        const previousPage = 'previousPageURL';
        browser.navigateTo(previousPage);
        LoginPage.navigateToLoginPage();
        LoginPage.enterCredentials('validUsername', 'validPassword');
        LoginPage.clickLoginButton();
        expect(browser.getCurrentUrl()).toBe(previousPage);
    });
});

describe('Authorization', () => {
    it('should display error message for invalid credentials', () => {
        LoginPage.navigateToLoginPage();
        LoginPage.enterCredentials('invalidUsername', 'invalidPassword');
        LoginPage.clickLoginButton();
        expect(LoginPage.getErrorMessage()).toContain('Invalid credentials');
    });
});

describe('Registration', () => {
    it('should successfully register with valid credentials', () => {
        RegistrationPage.navigateToRegistrationPage();
        RegistrationPage.enterCredentials('validUsername', 'validPassword', 'validEmail');
        RegistrationPage.clickRegisterButton();
        expect(RegistrationPage.isRegistered()).toBe(true);
    });
});

describe('Registration', () => {
    it('should display error message for invalid credentials', () => {
        RegistrationPage.navigateToRegistrationPage();
        RegistrationPage.enterCredentials('invalidUsername', 'invalidPassword', 'invalidEmail');
        RegistrationPage.clickRegisterButton();
        expect(RegistrationPage.getErrorMessage()).toContain('Invalid credentials');
    });
});

describe('Registration', () => {
    it('should save user information in the database after registration', () => {
        RegistrationPage.navigateToRegistrationPage();
        RegistrationPage.enterCredentials('newUsername', 'newPassword', 'newEmail');
        RegistrationPage.clickRegisterButton();
        expect(Database.isUserRegistered('newUsername')).toBe(true);
    });
});

describe('View NFTs', () => {
    it('should display a list of available NFTs on the marketplace page', () => {
        MarketplacePage.navigateToMarketplace();
        expect(MarketplacePage.isNFTListDisplayed()).toBe(true);
    });
});

describe('View NFTs', () => {
    it('should display detailed information about a selected NFT', () => {
        MarketplacePage.navigateToMarketplace();
        const selectedNFT = MarketplacePage.selectNFT();
        const detailedNFTInfo = selectedNFT.getDetailedInfo();
        expect(detailedNFTInfo).toBeDefined();
    });
});

describe('View NFTs', () => {
    it('should display an error message if there is a technical issue on the marketplace page', () => {
        MarketplacePage.navigateToMarketplaceWithError();
        expect(MarketplacePage.getErrorMessage()).toContain('An error occurred');
    });
});

describe('View NFTs', () => {
    it('should display an error message if a selected NFT is unavailable or there is an error', () => {
        MarketplacePage.navigateToMarketplace();
        const unavailableNFT = MarketplacePage.selectUnavailableNFT();
        expect(unavailableNFT.getErrorMessage()).toContain('NFT not found');
    });
});

describe('Sell NFT', () => {
    it('should navigate to "My NFTs" section in the dashboard', () => {
        DashboardPage.navigateToDashboard();
        DashboardPage.goToMyNFTs();
        expect(DashboardPage.isOnMyNFTsPage()).toBe(true);
    });
});

describe('Sell NFT', () => {
    it('should select an NFT to sell', () => {
        DashboardPage.selectNFTForSale();
        expect(DashboardPage.isNFTSelectedForSale()).toBe(true);
    });
});

describe('Sell NFT', () => {
    it('should display a form to configure sale parameters', () => {
        DashboardPage.clickSellButton();
        expect(DashboardPage.isSellFormDisplayed()).toBe(true);
    });
});

describe('Sell NFT', () => {
    it('should create a sale listing after entering correct details', () => {
        const saleDetails = {
            price: '100',
            conditions: 'Mint condition'
        };
        DashboardPage.fillSellForm(saleDetails);
        DashboardPage.confirmSale();
        expect(DashboardPage.isSaleListingCreated()).toBe(true);
    });
});

describe('Sell NFT', () => {
    it('should display an error message for incorrect sale details', () => {
        const invalidSaleDetails = {
            price: '-100', // Invalid price
            conditions: 'Invalid conditions'
        };
        DashboardPage.fillSellForm(invalidSaleDetails);
        DashboardPage.confirmSale();
        expect(DashboardPage.getErrorMessage()).toContain('Invalid details');
    });
});


describe('Buy NFT', () => {
    it('should display available NFTs on the platform', () => {
        MarketplacePage.navigateToMarketplace();
        expect(MarketplacePage.isNFTListDisplayed()).toBe(true);
    });
});

describe('Buy NFT', () => {
    it('should select a specific NFT to purchase', () => {
        MarketplacePage.selectNFTForPurchase();
        expect(MarketplacePage.isNFTSelectedForPurchase()).toBe(true);
    });
});

describe('Buy NFT', () => {
    it('should display transaction details after clicking "Buy"', () => {
        MarketplacePage.clickBuyButton();
        expect(MarketplacePage.isTransactionDetailsDisplayed()).toBe(true);
    });
});

describe('Buy NFT', () => {
    it('should confirm the intent to buy the NFT', () => {
        MarketplacePage.confirmPurchase();
        expect(MarketplacePage.isPurchaseConfirmed()).toBe(true);
    });
});

describe('Buy NFT', () => {
    it('should display an error message for insufficient funds', () => {
        MarketplacePage.selectExpensiveNFT();  // Choose an NFT with a high price
        MarketplacePage.clickBuyButton();
        expect(MarketplacePage.getErrorMessage()).toContain('Insufficient funds');
    });
});

describe('Create NFT', () => {
    it('should display the form for creating a new NFT', () => {
        CreateNFTPage.navigateToCreateNFT();
        expect(CreateNFTPage.isCreateNFTFormDisplayed()).toBe(true);
    });
});

describe('Create NFT', () => {
    it('should validate the image format and size', () => {
        CreateNFTPage.uploadInvalidImage();
        expect(CreateNFTPage.getErrorMessage()).toContain('Invalid image format or size');
    });
});

describe('Create NFT', () => {
    it('should validate the entered data for the new NFT', () => {
        CreateNFTPage.enterInvalidData();
        CreateNFTPage.clickCreateButton();
        expect(CreateNFTPage.getErrorMessage()).toContain('Invalid data');
    });
});

describe('Create NFT', () => {
    it('should successfully create a new NFT', () => {
        CreateNFTPage.enterValidData();
        CreateNFTPage.clickCreateButton();
        expect(CreateNFTPage.isSuccessMessageDisplayed()).toBe(true);
    });
});

describe('Edit Profile', () => {
    it('should display the form for editing the profile', () => {
        EditProfilePage.navigateToEditProfile();
        expect(EditProfilePage.isEditProfileFormDisplayed()).toBe(true);
    });
});

describe('Edit Profile', () => {
    it('should allow changing the profile picture', () => {
        EditProfilePage.uploadNewProfilePicture();
        EditProfilePage.clickSaveChanges();
        expect(EditProfilePage.isSuccessMessageDisplayed()).toBe(true);
    });
});

describe('Edit Profile', () => {
    it('should allow changing the username', () => {
        EditProfilePage.enterNewUsername();
        EditProfilePage.clickSaveChanges();
        expect(EditProfilePage.isSuccessMessageDisplayed()).toBe(true);
    });
});

describe('Edit Profile', () => {
    it('should allow changing the password', () => {
        EditProfilePage.enterNewPassword();
        EditProfilePage.clickSaveChanges();
        expect(EditProfilePage.isSuccessMessageDisplayed()).toBe(true);
    });
});

describe('Edit Profile', () => {
    it('should validate the entered password', () => {
        EditProfilePage.enterIncorrectPassword();
        EditProfilePage.clickSaveChanges();
        expect(EditProfilePage.getErrorMessage()).toContain('Invalid password');
    });
});

describe('Content Moderation', () => {
    it('should display the list of content requiring moderation', () => {
        ModerationPage.navigateToModeration();
        expect(ModerationPage.isContentListDisplayed()).toBe(true);
    });
});

describe('Content Moderation', () => {
    it('should allow viewing the details of each content', () => {
        ModerationPage.selectContentForReview();
        expect(ModerationPage.isContentDetailsDisplayed()).toBe(true);
    });
});

describe('Content Moderation', () => {
    it('should allow approving the content', () => {
        ModerationPage.approveContent();
        expect(ModerationPage.isSuccessMessageDisplayed()).toBe(true);
    });
});

describe('Content Moderation', () => {
    it('should allow rejecting the content with specifying a reason', () => {
        ModerationPage.rejectContentWithReason('Inappropriate content');
        expect(ModerationPage.isSuccessMessageDisplayed()).toBe(true);
    });
});

describe('User Management', () => {
    it('should display the list of registered users', () => {
        UserManagementPage.navigateToUserManagement();
        expect(UserManagementPage.isUserListDisplayed()).toBe(true);
    });
});

describe('User Management', () => {
    it('should allow blocking a user account', () => {
        UserManagementPage.selectUserToBlock();
        UserManagementPage.blockUser();
        expect(UserManagementPage.isSuccessMessageDisplayed()).toBe(true);
    });
});

describe('User Management', () => {
    it('should allow unblocking a user account', () => {
        UserManagementPage.selectBlockedUserToUnblock();
        UserManagementPage.unblockUser();
        expect(UserManagementPage.isSuccessMessageDisplayed()).toBe(true);
    });
});

describe('User Management', () => {
    it('should allow deleting a user account', () => {
        UserManagementPage.selectUserToDelete();
        UserManagementPage.deleteUser();
        expect(UserManagementPage.isSuccessMessageDisplayed()).toBe(true);
    });
})






