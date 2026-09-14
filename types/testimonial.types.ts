// src/types/testimonial.types.ts

export interface Testimonial {
    _id: string;
    name: string;
    message: string;
    isShow: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateTestimonialPayload {
    name: string;
    message: string;
  }
  
  export interface UpdateTestimonialStatusPayload {
    isShow: boolean;
  }