<template>
	<view class="content">
		<form @submit="formSubmit" @reset="formReset">
			<view class="form-item">
				<view class="list-item">
					<view class="item-text">计划标题</view>
					<view class="item-input">
						<input type="text" name="workplan_title" :value="detail.workplan_title" disabled/>
					</view>
				</view>
				<view class="list-item">
					<view class="item-text">执行人</view>
					<view class="item-input">
						<input type="text" :value="detail.workplan_executor_man" disabled/>
					</view>
				</view>
				<view class="list-item">
					<view class="item-text">审核人</view>
					<view class="item-input">
						<input v-if="detail.workplan_arranger_man" type="text" :value="detail.workplan_arranger_man" disabled/>
					</view>
				</view>
				<view class="list-item">
					<view class="item-text">开始时间</view>
					<view class="item-input">
						<input type="text" name="workplan_expectstart_time" :value="detail.workplan_expectstart_time" disabled/>
					</view>
				</view>
				<view class="list-item">
					<view class="item-text">结束时间</view>
					<view class="item-input">
						<input type="text" name="workplan_expectend_time" :value="detail.workplan_expectend_time" disabled/>
					</view>
				</view>
				<view class="list-item" v-if="detail.memo">
					<view class="item-text">备注</view>
					<view class="item-input" style="margin-top:25upx">
						<rich-text class="item-content" :nodes="detail.memo"></rich-text>
					</view>
				</view>
				<view class="list-item" v-if="detail.workplan_content">
					<view class="item-text">内容</view>
					<view class="item-input" style="margin-top:25upx">
						<rich-text class="item-content" :nodes="detail.workplan_content"></rich-text>
					</view>
				</view>
			</view>
			
			
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:[],
				date:''
			}
		},
		onLoad(e) {
			var t=this;	
			var workplan_id=e.id;
			//获取详情
			t.urlRequest.urlRequest(t.func.getOaWorkplanDetail,{workplan_id:workplan_id},function(res){
				t.detail=res.data.workplan_row
			})
		},
		methods: {
		}
	}
</script>

<style>
	.form-item{width: 94%;margin: auto;}
	.list-item{width: 100%;display: flex;border-bottom: 1px solid #e8e8e8;}
	.list-item:last-child{border: 0upx;}
	.item-text{flex: 1;height: 100upx;line-height: 100upx;color: #B3B3B3;}
	.item-input{flex: 4;}
	.item-input input{height: 100upx;width: 100%;font-size: 14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
	textarea{width: 96%;padding: 10upx;font-size: 14px;}
	.content-info{display: flex;}
</style>
