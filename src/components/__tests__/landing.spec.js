import { shallowMount } from '@vue/test-utils';
import LandingComponent from "../../components/LandingComponent.vue";

jest.mock('../../assets/heart-icon.svg', () => {
    return "heart.png"
});

describe("sut landing component", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(LandingComponent, {
            data(){
                return{
                    likeLogo: 'http://localhost:8080/image/1',
                    zeroLikes: 0,
                    textShare: false,
                    icon: false,
                    postUrl: 'http://localhost:8080/posts-view?urlPost='
                }
            },
            propsData: {
                userImage: 'http://mimagen.com/124add2', 
                image: 'http://mimagen.com/124add',
                nick: 'paquito 21',
                description: 'esta una descripción de prueba',
                postId: 'cee07e98-2a20-493f-925f-dfa0747bc596', 
                amountLikes: 15
            } 
        });
    });

    it("should create a card component", () => {
        expect(wrapper).toBeDefined();
    });

    describe('props', () => {
        it('should exists userImage property', () => {
            const userImage = wrapper.vm.userImage;
            const mockUrl = 'http://mimagen.com/124add2';
            expect(userImage).toEqual(mockUrl);
        });

        it('should exists image property', () => {
            const image = wrapper.vm.image;
            const mockImage = 'http://mimagen.com/124add';
            expect(image).toEqual(mockImage);
        });

        it('should exists nick property', () => {
            const nick = wrapper.vm.nick;
            const mockNick = 'paquito 21';
            expect(nick).toEqual(mockNick);
        });

        it('should exists description property', () => {
            const description = wrapper.vm.description;
            const mockDescription = 'esta una descripción de prueba';
            expect(description).toEqual(mockDescription);
        });

        it('should exists postId property', () => {
            const postId = wrapper.vm.postId;
            const mockPostId = 'cee07e98-2a20-493f-925f-dfa0747bc596';
            expect(postId).toEqual(mockPostId);
        });

        it('should exists amountLikes property', () => {
            const amountLikes = wrapper.vm.amountLikes;
            const mockAmountLikes= 15;
            expect(amountLikes).toEqual(mockAmountLikes);
        });
    });

    describe('emits', () => {
        it('should emit getUserLanding', () => {
            wrapper.vm.getUserLanding();
            expect(wrapper.vm.$emit('getUserLanding')).toBeTruthy();
        });

        it('shoould emit likePost when user like a post', () => {
            wrapper.vm.likePost();
            expect(wrapper.vm.icon).toBeTruthy();
            expect(wrapper.vm.$emit('likePost')).toBeTruthy();
            expect(wrapper.vm.likeLogo).toEqual('heart.png');
        });

        it('shoould not emit likePost', () => {
            wrapper.vm.icon = true;
            wrapper.vm.likePost();
            expect(wrapper.vm.icon).toBeFalsy();
            expect(wrapper.vm.likeLogo).toEqual(wrapper.vm.likeLogo);
        });
    });

    describe('methods', () => {
        xit("should show alert when user has error", () => {
            wrapper.vm.onError();
            window.alert = () => {};
            expect(window.alert).toHaveBeenCalled();
        });

        it("should do something", async () => {
            jest.useFakeTimers();
                wrapper.vm.sharePost();
                expect(wrapper.vm.textShare).toBeTruthy();
            jest.runAllTimers();
            expect(wrapper.vm.textShare).toBeFalsy();
        });
    });
});