package book.manager.controller;

import book.manager.domain.common.IdVO;
import book.manager.domain.common.Response;
import book.manager.domain.dto.RichTextPageDTO;
import book.manager.domain.dto.UserRichTextAddDTO;
import book.manager.domain.dto.UserRichTextUpdateDTO;
import book.manager.domain.vo.RichTextPageVO;
import book.manager.domain.vo.RichTextVO;
import book.manager.service.RichTextService;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

/**
 * @author: zss
 * @date: 2025/11/26
 * @desc: 富文本接口
 */
@Api(tags = "富文本接口")
@RestController
@RequestMapping("/richText/v1")
public class RichTextController {
    
    @Resource
    private RichTextService richTextService;
    
    @ApiOperation("创建:富文本")
    @PostMapping("/create/richText")
    public Response<IdVO> createRichText(@Valid @RequestBody UserRichTextAddDTO dto) {
        return Response.ok(richTextService.createRichText(dto));
    }
    
    @ApiOperation("更新:富文本")
    @PostMapping("/update/richText")
    public Response<Boolean> updateRichText(@Valid @RequestBody UserRichTextUpdateDTO dto) {
        richTextService.updateRichText(dto);
        return Response.ok(true);
    }
    
    @ApiOperation("分页查询:公告管理")
    @PostMapping("/page")
    public Response<Page<RichTextPageVO>> richTextPage(@Valid @RequestBody RichTextPageDTO pageDTO) {
        return Response.ok(richTextService.richTextPage(pageDTO));
    }
    
    @ApiOperation("删除:公告管理")
    @GetMapping("/delete")
    public Response<Boolean> deleteRichText(@RequestParam String id) {
        richTextService.deleteRichText(id);
        return Response.ok(true);
    }
    
    @ApiOperation("根据id获取公告")
    @GetMapping("/detail")
    public Response<RichTextVO> richTextDetail(@RequestParam String id) {
        return Response.ok(richTextService.richTextDetail(id));
    }
    
}
